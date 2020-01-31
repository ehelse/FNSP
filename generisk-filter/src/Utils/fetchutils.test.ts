const renameKeys = require("./fetchutils")

test('Testing utility functions', () => {
    it('should change they keys', () => {
        const testListe = [{a: 'a', b: 'b'}]
        const nyeVerdier = {a:'A', b:'B'}
        const rename = renameKeys(testListe, nyeVerdier)

        expect(rename).toEqual([{A:'a', B:'b'}])
    })
})