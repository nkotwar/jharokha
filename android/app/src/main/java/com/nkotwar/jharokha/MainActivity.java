package com.nkotwar.jharokha;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.webkit.WebViewAssetLoader;

import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Jharokha shell: a full-screen WebView around the Jharokha web app.
 *
 * - Loads the live site (GitHub Pages) so content updates arrive without reinstalling.
 * - Falls back to the copy bundled inside the APK if the TV is offline on first launch.
 * - Exposes window.JharokhaNative to the page (voice search, version info).
 *   BRIDGE RULE: only ever ADD methods; never rename/remove them, because newer web code
 *   must keep working with older installed APKs (and the web side feature-checks every call).
 * - Maps the remote: Back -> Jharokha.back(), Search key -> Jharokha.openSearch().
 */
public class MainActivity extends Activity {

    static final String REMOTE_HOST = "nkotwar.github.io";
    static final String REMOTE_URL = "https://nkotwar.github.io/jharokha/";
    static final String LOCAL_HOST = "appassets.androidplatform.net";
    static final String LOCAL_URL = "https://appassets.androidplatform.net/assets/web/index.html";
    static final int BRIDGE_API = 1;
    static final int REQ_VOICE = 41;

    private WebView web;
    private WebViewAssetLoader assets;
    private boolean usingLocal = false;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        web = new WebView(this);
        web.setBackgroundColor(0xFF141A24);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setUserAgentString(s.getUserAgentString() + " JharokhaTV/" + BuildConfig.VERSION_CODE);

        assets = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        web.addJavascriptInterface(new Bridge(), "JharokhaNative");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) {
                return assets.shouldInterceptRequest(req.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                Uri u = req.getUrl();
                String host = u.getHost() == null ? "" : u.getHost();
                if (host.equals(REMOTE_HOST) || host.equals(LOCAL_HOST)) return false;
                // Anything else (outside links, APK downloads) goes to another app if the TV has one.
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, u));
                } catch (ActivityNotFoundException e) {
                    toast("That link opens outside Jharokha — try it on your phone");
                }
                return true;
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest req, WebResourceError err) {
                if (req.isForMainFrame() && !usingLocal) {
                    usingLocal = true;
                    view.loadUrl(LOCAL_URL);
                }
            }
        });

        if (state != null) web.restoreState(state);
        else web.loadUrl(REMOTE_URL);
        web.requestFocus();
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent e) {
        int code = e.getKeyCode();
        if (code == KeyEvent.KEYCODE_BACK || code == KeyEvent.KEYCODE_ESCAPE) {
            if (e.getAction() == KeyEvent.ACTION_UP) handleBack();
            return true;
        }
        if (code == KeyEvent.KEYCODE_SEARCH) {
            if (e.getAction() == KeyEvent.ACTION_UP) js("window.Jharokha&&Jharokha.openSearch&&Jharokha.openSearch()");
            return true;
        }
        return super.dispatchKeyEvent(e);
    }

    private void handleBack() {
        web.evaluateJavascript("(window.Jharokha&&Jharokha.back)?Jharokha.back():'nojs'", v -> {
            if (v == null) v = "";
            if (v.contains("exit")) {
                finish();
            } else if (v.contains("nojs")) {
                if (web.canGoBack()) web.goBack(); else finish();
            }
        });
    }

    private void js(String code) {
        runOnUiThread(() -> web.evaluateJavascript(code, null));
    }

    private void toast(String msg) {
        runOnUiThread(() -> Toast.makeText(this, msg, Toast.LENGTH_SHORT).show());
    }

    @Override
    protected void onActivityResult(int req, int result, Intent data) {
        super.onActivityResult(req, result, data);
        if (req != REQ_VOICE) return;
        if (result == RESULT_OK && data != null) {
            ArrayList<String> r = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            if (r != null && !r.isEmpty()) {
                js("window.Jharokha&&Jharokha.onVoiceResult(" + JSONObject.quote(r.get(0)) + ")");
                return;
            }
        }
        js("window.Jharokha&&Jharokha.onVoiceError(" + JSONObject.quote("Didn't catch that") + ")");
    }

    /** Methods visible to the page as window.JharokhaNative.* — add only, never remove. */
    class Bridge {
        @JavascriptInterface public int apiVersion() { return BRIDGE_API; }
        @JavascriptInterface public int versionCode() { return BuildConfig.VERSION_CODE; }
        @JavascriptInterface public String versionName() { return BuildConfig.VERSION_NAME; }
        @JavascriptInterface public boolean isTV() {
            return getPackageManager().hasSystemFeature(PackageManager.FEATURE_LEANBACK);
        }
        @JavascriptInterface public void startVoice(String lang) {
            runOnUiThread(() -> {
                Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                if (lang != null && !lang.isEmpty()) i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
                i.putExtra(RecognizerIntent.EXTRA_PROMPT, "Search Jharokha");
                try {
                    startActivityForResult(i, REQ_VOICE);
                } catch (ActivityNotFoundException e) {
                    js("window.Jharokha&&Jharokha.onVoiceError(" + JSONObject.quote("Voice search isn't available on this TV") + ")");
                }
            });
        }
    }
}
