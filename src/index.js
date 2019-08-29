import React, { forwardRef, memo } from 'react'
import {
    View,
    Image,
    NativeModules,
    requireNativeComponent,
    StyleSheet,
    Platform,
} from 'react-native'

const isAndroid = Platform.OS === 'android'

const FastImageViewNativeModule = NativeModules.FastImageView

function FastImageBase({
    source,
    defaultSource,
    tintColor,
    onLoadStart,
    onProgress,
    onLoad,
    onError,
    onLoadEnd,
    style,
    children,
    fallback,
    forwardedRef,
    ...props
}) {
    const resolvedSource = Image.resolveAssetSource(source)
    let resolvedDefaultSource = defaultSource

    if (isAndroid) {
        // Android receives a URI string, and resolves into a Drawable using RN's methods
        resolvedDefaultSource = Image.resolveAssetSource(defaultSource)

        if (resolvedDefaultSource)
            resolvedDefaultSource = resolvedDefaultSource.uri
        else resolvedDefaultSource = null
    } else if (typeof resolvedDefaultSource !== 'number') {
        // In iOS the number is passed, and bridged automatically into an UIImage
        resolvedDefaultSource = null
    }

    if (fallback) {
        return (
            <View style={[styles.imageContainer, style]} ref={forwardedRef}>
                <Image
                    {...props}
                    tintColor={tintColor}
                    style={StyleSheet.absoluteFill}
                    source={resolvedSource}
                    defaultSource={defaultSource}
                    onLoadStart={onLoadStart}
                    onProgress={onProgress}
                    onLoad={onLoad}
                    onError={onError}
                    onLoadEnd={onLoadEnd}
                />
                {children}
            </View>
        )
    }

    return (
        <View style={[styles.imageContainer, style]} ref={forwardedRef}>
            <FastImageView
                {...props}
                tintColor={tintColor}
                style={StyleSheet.absoluteFill}
                source={resolvedSource}
                defaultSource={resolvedDefaultSource}
                onFastImageLoadStart={onLoadStart}
                onFastImageProgress={onProgress}
                onFastImageLoad={onLoad}
                onFastImageError={onError}
                onFastImageLoadEnd={onLoadEnd}
            />
            {children}
        </View>
    )
}

const FastImageMemo = memo(FastImageBase)

const FastImage = forwardRef((props, ref) => (
    <FastImageMemo forwardedRef={ref} {...props} />
))

FastImage.displayName = 'FastImage'

const styles = StyleSheet.create({
    imageContainer: {
        overflow: 'hidden',
    },
})

FastImage.resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
}

FastImage.priority = {
    // lower than usual.
    low: 'low',
    // normal, the default.
    normal: 'normal',
    // higher than usual.
    high: 'high',
}

FastImage.cacheControl = {
    // Ignore headers, use uri as cache key, fetch only if not in cache.
    immutable: 'immutable',
    // Respect http headers, no aggressive caching.
    web: 'web',
    // Only load from cache.
    cacheOnly: 'cacheOnly',
}

FastImage.preload = sources => {
    FastImageViewNativeModule.preload(sources)
}

FastImage.defaultProps = {
    resizeMode: FastImage.resizeMode.cover,
}

const FastImageView = requireNativeComponent('FastImageView', FastImage, {
    nativeOnly: {
        onFastImageLoadStart: true,
        onFastImageProgress: true,
        onFastImageLoad: true,
        onFastImageError: true,
        onFastImageLoadEnd: true,
    },
})

export default FastImage
