/* eslint-disable */

const activityIdDtoInType = shape({
    id: string().isRequired(),
});

const activityCreateDtoInType = shape({
    categoryId: string(255),
    time: integer(1, 1440),
    activityDate: date()
});

const activityUpdateDtoInType = shape({
    id: string().isRequired(),
    categoryId: string(255),
    time: integer(1, 1440),
    activityDate: date()
});

// TODO:
// update  { id: "123", categoryId: "789", date: "2023-11-19", length: 20 }
// pro create totéž, ale bez ID
// awid se dodává až v ABL

