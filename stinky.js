function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    const promise = new Promise((res) => {
        script.onload = res;
    })
    document.appendChild(script);
    return promise;
}

