export const findDuplicatesInSubObject = (resultSet: any) => {
    const finalArray: any[] = [];
    const keys = Object.keys(resultSet);
    if (keys.length === 0) return finalArray;
    else if (keys.length === 1) return resultSet[keys[0]];
    const reducedValues = keys.reduce((acc, mainFilter) => {
        let resultObject = resultSet[mainFilter];
        if (acc && acc.length) {
            return acc.filter((accResult: any) => resultObject.find((result: any) => accResult.id === result.id));
        }
        return resultObject;
    }, []);
    return reducedValues;
}

export const flatMapAndRemoveDuplicates = (array: any[]) => {
    return array && array.length && array.flatMap(v => v).filter((value, index, self) => index === self.findIndex((t) => (t.id === value.id)));
}