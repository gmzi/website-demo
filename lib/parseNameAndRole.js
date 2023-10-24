// export function parseNameAndRole(inputString) {
//     if (inputString?.length) {
//         const entriesArray = inputString.trim().split("\n").filter(line => line.trim() !== '');

//         const parsedData = entriesArray.map(entry => {
//             const roleAndNames = entry.split(":");
//             const role = roleAndNames[0]?.trim();
//             const namesString = roleAndNames[1]?.trim();
            
//             if (!role || !namesString) {
//                 return;
//             }

//             const names = namesString.split(",").map(name => name.trim());

//             return names.map(name => {
//                 return { name, role };
//             });
//         }).flat().filter(Boolean);

//         return parsedData;
//     } 
//     return [];
// }

export function parseNameAndRole(inputString) {
    if (inputString?.length) {
        const entriesArray = inputString.trim().split("\n").filter(line => line.trim() !== '');

        const parsedData = entriesArray.map(entry => {
            // Check if the entry contains a ':'
            if (entry.includes(":")) {
                const roleAndNames = entry.split(":");
                const role = roleAndNames[0]?.trim();
                const namesString = roleAndNames[1]?.trim();
                
                if (!role || !namesString) {
                    return;
                }

                const names = namesString.split(",").map(name => name.trim());
                return names.map(name => {
                    return { name, role };
                });
            } else {
                // If no ':' in the entry, split by comma and consider them as names
                const names = entry.split(",").map(name => name.trim());
                return names.map(name => {
                    return { name, role: '' }; // default empty string for role
                });
            }
        }).flat().filter(Boolean);

        return parsedData;
    } 
    return [];
}



// export function parseNameAndRole(inputString) {
//     if (inputString?.length) {
//         // const contentString = inputString.trim();
//         const contentString = inputString.trim().replace(/,$/, '');
//         const namesAndRolesArray = contentString.split(",");

//         const parsedData = namesAndRolesArray.map(element => {
//             const nameAndRole = element.split(":");
//             const name = nameAndRole[0]?.trim();
//             const role = nameAndRole[1]?.trim();
//             return name || role ? { name, role } : {};
//         })
//         return parsedData
//     } 
//     return [];
// };


// export function parseNameAndRoleInServer(inputString) {
//     if (inputString.length) {
//         const contentString = inputString.trim();
//         const namesAndRolesArray = contentString.split(",");

//         const parsedData = namesAndRolesArray.map(element => {
//             const nameAndRole = element.split(":");
//             const name = nameAndRole[0]?.trim();
//             const role = nameAndRole[1]?.trim();
//             return name || role ? { name, role } : [];
//         })
//         return parsedData
//     }
//     return [];
// };