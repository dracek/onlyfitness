/* eslint-disable */

const categoryIdDtoInType = shape({
    id: id().isRequired(),
});

const categoryListDtoInType = shape({
    pageInfo: shape({}, true) 
});

const categoryCreateDtoInType = shape({
    name: string(255).isRequired(),
    value: integer(0, 9999),
})

const categoryUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(255),
    value: integer(0, 9999),
})

