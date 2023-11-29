const activityListDtoInType = shape({
    sortBy: oneOf(["name"]),
    order: oneOf(["asc", "desc"]),
    categoryIdList: array(id(), 1, 10),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
  });
  
  const activityGetDtoInType = shape({
    id: id().isRequired(),
  });
  
  const activityCreateDtoInType = shape({
    name: uu5String(255).isRequired(),
    text: uu5String(4000).isRequired("image"),
    categoryIdList: array(id(), 1, 10),
    /*image: binary().isRequired("text"),*/
  });