/* eslint-disable */

const activityIdDtoInType = shape({
    id: string().isRequired(),
});

const activityCreateDtoInType = shape({
    id: string().isRequired(),
    name: string(255),
    type: oneOf(["Swim","Run","Walk","Ride"]),
    time: integer(1, 1440),
    activityDate: date()
});

