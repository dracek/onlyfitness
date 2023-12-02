/* eslint-disable */

const activityIdDtoInType = shape({
    id: id().isRequired(),
});

const activityListDtoInType = shape({
    categoryId: string(),
    from: date(),
    to: date(),
    pageInfo: shape({}, true) 
});

const activityCreateDtoInType = shape({
    categoryId: string().isRequired(),
    time: integer(1, 1440).isRequired(),
    activityDate: date().isRequired()
});

const activityUpdateDtoInType = shape({
    id: id().isRequired(),
    categoryId: string(),
    time: integer(1, 1440),
    activityDate: date()
});
