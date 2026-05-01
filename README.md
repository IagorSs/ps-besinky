# Smart To-Do List

A project to selection process of besinky, see [INSTRUCTIONS.md](./INSTRUCTIONS.md) to more info.

## To start application

### Using docker

Runs the following command and see the magic happen.

```sh
$npm run docker:start
```

The backend will be serve on port [3001](http://localhost:3001) and frontend on [3000](http://localhost:3000).

### Directly on host

The projects on [./applications](./applications/) need to have your files .env.example duplicated to .env and filled, after this follow the script.

```sh
# Activate yarn version of project
$corepack enable
$corepack use yarn@4.12.0

# Install deps
$yarn

# Runs backend
$yarn backend:start

# Runs frontend
$yarn frontend:dev
```

The backend will be serve on port configured on env (or, by default, on [3001](http://localhost:3001)) and frontend on [3000](http://localhost:3000).

## Documentation

- API: OpenAPI swagger interface on [/api/docs](http://localhost:3001/api/docs)

## Some decisions explanations

- Features delivery over quality: due the context of selective process application I prioritize the delivery of many feature as possible sacrificing some aspects of code quality like DRY and unit tests.
- Monorepo: I choose a monorepo structure for this project to better orchestration of fullstack application and shared codes like domain.
- Yarn 4: Following the attempt to use most updated version of dependencies I update the dependency manager itself to be most recent and performative version.
- Integrated api docs: To prevent problems of comments and documentations separated from code cited in clean code I integrate the swagger doc with backend framework to, as far as possible, be updated as the code is updated.
- Use of REST best practices in API: the resources of backend can be accessed intuitively and following recommended practices like usage of body, query and path params, json, http methods, etc.
- Backend Architecture: I choose simplified version of layered architecture as recommended in clean code for first version of applications. The simplicity with consistency are the best things to have at this point and the layers controller, service and repository delivery this fastest.

## Future Features

- [ ] Save AI prompts, associate generated tasks and show this structure in frontend

## Future improvements

- [ ] Automated tests
- [ ] Identification on swagger of explicit errors dynamically threw on route flows
- [ ] Invert dependency injection 
- [ ] Unify eslint, tsconfig, prettier, editorconfig, etc. of all workspaces to create just one pattern for entire code
- [ ] Implement unified logs pattern
- [ ] Centralize system that throw logs
- [ ] Implement error pattern
- [ ] Use react contexts to prevent [prop drilling](https://www.freecodecamp.org/news/prop-drilling-in-react-explained-with-examples/)
