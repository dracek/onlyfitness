/* eslint-disable */

//popis validace:  https://uuapp.plus4u.net/uu-bookkit-maing01/5ac75f89692048c7bd3a2ef12b6fce35/book/page?code=37641440


const settingsIdDtoInType = shape({
    id: string().isRequired(),
});

const settingsCreateDtoInType = shape({
    id: string().isRequired(),
    name: string(255),
    gender: oneOf(["F","M", "O"]),
    height: integer(0, 299),
    weight: integer(0, 999),
    age: integer(0,150)
});
