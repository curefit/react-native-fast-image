import { StyleSheet } from 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import './test_util/android_platform'
import FastImage from './index.js'

const style = StyleSheet.create({
    image: { width: 44, height: 44 },
    tint: { tintColor: '#f00' },
})

describe('Android specific.', () => {
    test('Renders a normal defaultSource.', () => {
        const tree = renderer
            .create(
                <FastImage
                    defaultSource={require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif')}
                    style={style.image}
                    fallback
                />,
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    test('Renders a normal defaultSource when fails to load source.', () => {
        const tree = renderer
            .create(
                <FastImage
                    defaultSource={require('../ReactNativeFastImageExampleServer/pictures/jellyfish.gif')}
                    source={{
                        uri: 'https://www.google.com/image_does_not_exist.png',
                    }}
                    style={style.image}
                    fallback
                />,
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })

    test('Renders a non-existing defaultSource.', () => {
        const tree = renderer
            .create(
                <FastImage
                    defaultSource={12345}
                    style={style.image}
                    fallback
                />,
            )
            .toJSON()

        expect(tree).toMatchSnapshot()
    })
})
