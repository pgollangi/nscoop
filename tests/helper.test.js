const path = require('path')
const helper = require('../src/helper')

describe('helper', () => {
  var binaries = [
    'fastget_0.2.0_windows_386.zip', 'fastget_0.2.0_windows_amd64.zip',
    'fastget_0.2.0_windows_i386.zip', 'fastget_0.2.0_windows_x86_64.zip',
    'fastget_0.2.0_linux_386.tar.gz', 'fastget_0.2.0_linux_amd64.tar.gz',
    'fastget_0.2.0_linux_i386.tar.gz', 'fastget_0.2.0_linux_x86_64.tar.gz',
    'fastget_0.2.0_macOS_amd64.tar.gz', 'fastget_0.2.0_macOS_x86_64.tar.gz'
  ]

  test('findBinary', () => {
    var binary = helper.findBinary(binaries, b => b, 'win32', 'x64')
    expect(binary).toMatch('fastget_0.2.0_windows_amd64.zip')

    expect(() => helper.findBinary(binaries, b => b, 'android', 'x64')).toThrow('Unsupported platform android')
    expect(() => helper.findBinary(binaries, b => b, 'linux', 'arm')).toThrow('Unsupported OS architecture arm')
  })

  test('findBinary: unsupported platform', () => {
    expect(() => helper.findBinary(binaries, b => b, 'android', 'x64')).toThrow('Unsupported platform android')
  })

  test('findBinary: unsupported arch', () => {
    expect(() => helper.findBinary(binaries, b => b, 'linux', 'arm')).toThrow('Unsupported OS architecture arm')
  })

  test('getBinaryFromArchive: zip', () => {
    return helper.getBinaryFromArchive('./tests/binaries/program_1.0.0_windows_amd64.zip', 'dist').then(binary => {
      expect(binary).toBe(path.resolve('dist', 'program_1.0.0_windows_amd64/program.exe'))
    })
  })

  test('getBinaryFromArchive: tar.gz', () => {
    return helper.getBinaryFromArchive('./tests/binaries/program_1.0.0_linux_amd64.tar.gz', 'dist').then(binary => {
      expect(binary).toBe(path.resolve('dist', 'program_1.0.0_linux_amd64/program'))
    })
  })

  test('getBinaryFromArchive: empty', () => {
    return helper.getBinaryFromArchive('./tests/binaries/program_1.0.0_windows_amd64_empty.zip', 'dist').catch(err => {
      expect(err.message).toEqual('Could not find binary in archive "./tests/binaries/program_1.0.0_windows_amd64_empty.zip"')
    })
  })
})
