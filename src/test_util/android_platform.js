jest.mock('Platform', () => {
    const Platform = require.requireActual('Platform')
    Platform.OS = 'android'
    return Platform
})
