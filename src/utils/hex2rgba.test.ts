import { hex2rgba } from './hex2rgba'

describe('hex2rgba', () => {
  // Test wrong hex code
  it('should handle wrong hex code - 1', () => {
    const hex = '#test'
    const expected = 'rgba(0, 0, 0, 0.75)'
    const result = hex2rgba(hex)
    expect(result).toEqual(expected)
  })

  it('should handle wrong hex code - 2', () => {
    const hex = 'test'
    const expected = 'rgba(0, 0, 0, 0.75)'
    const result = hex2rgba(hex)
    expect(result).toEqual(expected)
  })

  it('should handle wrong hex code - 3', () => {
    const hex = '#<32'
    const expected = 'rgba(0, 0, 0, 0.75)'
    const result = hex2rgba(hex)
    expect(result).toEqual(expected)
  })

  // Check if function correctly converts hex code to rgba
  it('should convert a 3-digit hex code to rgba format', () => {
    const hex = '#abc'
    const expected = 'rgba(170,187,204,0.75)'
    const result = hex2rgba(hex)
    expect(result).toEqual(expected)
  })

  it('should convert a 6-digit hex code to rgba format', () => {
    const hex = '#abcdef'
    const expected = 'rgba(171,205,239,0.75)'
    const result = hex2rgba(hex)
    expect(result).toEqual(expected)
  })

  it('should convert a 3-digit hex code with custom alpha value to rgba format', () => {
    const hex = '#abc'
    const alpha = 0.5
    const expected = 'rgba(170,187,204,0.5)'
    const result = hex2rgba(hex, alpha)
    expect(result).toEqual(expected)
  })

  it('should convert a 6-digit hex code with custom alpha value to rgba format', () => {
    const hex = '#abcdef'
    const alpha = 0.25
    const expected = 'rgba(171,205,239,0.25)'
    const result = hex2rgba(hex, alpha)
    expect(result).toEqual(expected)
  })
})
