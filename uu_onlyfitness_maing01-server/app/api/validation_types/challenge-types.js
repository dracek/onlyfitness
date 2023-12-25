/* eslint-disable */

const challengeIdDtoInType = shape({
    id: id().isRequired(),
});

const challengeListDtoInType = shape({
    pageInfo: shape({}, true) 
});

const challengeCreateDtoInType = shape({
    categoryId: string().isRequired(),
    value: integer(0, 9999).isRequired(),
})

const challengeUpdateDtoInType = shape({
    id: id().isRequired(),
    categoryId: string(),
    value: integer(0, 9999),
})

/* eslint-disable */
