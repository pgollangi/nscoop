const helper = require('../src/helper')

test('findBinary', () => {
    var binaries = [
        'fastget_0.2.0_windows_386.zip', 'fastget_0.2.0_windows_amd64.zip',
        'fastget_0.2.0_windows_i386.zip', 'fastget_0.2.0_windows_x86_64.zip',
        'fastget_0.2.0_linux_386.tar.gz', 'fastget_0.2.0_linux_amd64.tar.gz',
        'fastget_0.2.0_linux_i386.tar.gz', 'fastget_0.2.0_linux_x86_64.tar.gz',
        'fastget_0.2.0_macOS_amd64.tar.gz', 'fastget_0.2.0_macOS_x86_64.tar.gz'
    ]

    var binary = helper.findBinary(binaries, b => b)

    expect(binary).toMatch('')
})
