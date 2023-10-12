export function parseNameAndRole(inputString) {
    const contentString = inputString.trim();
    const namesAndRolesArray = contentString.split(",");

    const parsedData = namesAndRolesArray.map(element => {
        const nameAndRole = element.split(":");
        const name = nameAndRole[0]?.trim() || '';
        const role = nameAndRole[1]?.trim() || '';
        return { name, role };
    });
    return parsedData;
}