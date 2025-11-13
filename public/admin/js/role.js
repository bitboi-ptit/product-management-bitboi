// Permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        let permissions = [];

        const rows = tablePermissions.querySelectorAll("[data-name]");
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const input = row.querySelectorAll("input");
            if (name == "id") {
                input.forEach(item => {
                    const id = item.value;
                    permissions.push({
                        id: id,
                        permissions: []
                    })
                })
            } else {
                input.forEach((item, index) => {
                    if (item.checked) {
                        permissions[index].permissions.push(name);
                    }
                })
            }
        });
        console.log(permissions);
        if (permissions.length > 0) {
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
            inputPermissions.value = JSON.stringify(permissions);
            formChangePermissions.submit();
        }

    })

}
// End Permissions 

// Permissions Data Default 
const dataRecords = document.querySelector("[data-records]");

if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermissions = document.querySelector("[table-permissions]");

    console.log(records);
    records.forEach((record, index) => {
        const permissions = record.permission;
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input");
            input[index].checked = true;
        })

    })
}
// End Permissions Data Default 