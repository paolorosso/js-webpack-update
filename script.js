async checkUpdate(url, autoUpdate) {
    if (url.length == 0) return false;
    try {
        // If i use static file, add time to avoid cache
        if (url.endsWith(".html")) url += "&timeStamp=" + new Date().getTime();
        let res = await fetch(url);
        let str = await res.text();
        let strFind = "<link href=/js/app.";
        let start = str.indexOf(strFind);
        let hash = str.substring(
            start + strFind.length,
            start + strFind.length + 8
        );
        let vers = localStorage.getItem("version");
        // Check local version / webpack
        if (vers && vers !== hash) {
            // Check autoupdate
            if (autoUpdate) {
                localStorage.removeItem("version");
                window.location.reload();
            }
            return true;
        } else {
            localStorage.setItem("version", hash);
        }
    } catch (error) {
        console.log(error);
    }
    return false;
},