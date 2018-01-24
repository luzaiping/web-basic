(function() {
    const canvas = document.querySelector('#glCanvas')

    const webGLContext = canvas.getContext('webgl') // 这个上下文是基于特定的canvas实例

    if (!webGLContext) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.')
        return
    }

    // set clear color to black, fully opaque
    webGLContext.clearColor(0.0, 0.0, 0.0, 1.0)

    // clear the color buffer with specified clear color.
    webGLContext.clear(webGLContext.COLOR_BUFFER_BIT)

})()