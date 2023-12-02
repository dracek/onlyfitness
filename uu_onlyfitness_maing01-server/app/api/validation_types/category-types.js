
const categoryCreateDtoInType = shape({
    name: string(255).isRequired(),
    text: string(4000)
})