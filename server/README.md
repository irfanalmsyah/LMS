# Express Server

#### Authenticating user

<details>
 <summary><code>GET</code> <code><b>/</b></code></summary>

##### Body

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | token      |  required | master token set in `.env`         |
> | email      |  required | user email         |
> | password      |  required | user password         |


##### Responses

> | response                                                            | description |
> |---------------------------------------------------------------------| ----------- |
> | `{ token: string, user: { id: string, name: string, username: string, password: string, email: string, nim: string, role: string, createdAt: string, updatedAt: string } }` | user is authenticated, returns token and user data |
> | `{ message: string }` | error message |
</details>

---

#### Users

<details>
 <summary><code>GET</code> <code><b>/users</b></code></summary>
 Getting All Users

##### Body

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | token      |  required | admin token         |

##### Responses

> | response                                                            | description |
> |---------------------------------------------------------------------| ----------- |
> | `{ users: [{ id: string, name: string, username: string, password: string, email: string, nim: string, role: string, createdAt: string, updatedAt: string }] }` | all of users in the database |
> | `{ message: string }` | error message |
</details>

<details>
    <summary><code>GET</code> <code><b>/users/:id</b></code></summary>
    Getting User by ID

##### Parameters

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | id      |  required | user id         |

##### Body

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | token      |  required | admin token         |

##### Responses

> | response                                                            | description |
> |---------------------------------------------------------------------| ----------- |
> | `{id: string, name: string, username: string, password: string, email: string, nim: string, role: string, createdAt: string, updatedAt: string }` | user data |
> | `{ message: string }` | error message |
</details>

<details>
    <summary><code>GET</code> <code><b>/users/me</b></code></summary>
    Getting User Data by Token

##### Body

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | token      |  required | user token         |

##### Responses

> | response                                                            | description |
> |---------------------------------------------------------------------| ----------- |
> | `{id: string, name: string, username: string, password: string, email: string, nim: string, role: string, createdAt: string, updatedAt: string }` | user data |
> | `{ message: string }` | error message |
</details>

<details>
    <summary><code>POST</code> <code><b>/users</b></code></summary>
    Creating User

##### Body

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | token      |  required | master token set in `.env`         |
> | name      |  required | user name         |
> | username      |  required | user username         |
> | password      |  required | user password         |
> | email      |  required | user email         |
> | nim      |  required | user nim         |
> | role      |  optional | user role         |

##### Responses

> | response                                                            | description |
> |---------------------------------------------------------------------| ----------- |
> | `{id: string, name: string, username: string, password: string, email: string, nim: string, role: string, createdAt: string, updatedAt: string }` | user data |
> | `{ message: string }` | error message |

</details>

<details>
    <summary><code>PUT</code> <code><b>/users/:id</b></code></summary>
    Updating User by ID

##### Parameters

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | id      |  required | user id         |

##### Body

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | token      |  required | admin token         |
> | name      |  optional | user name         |
> | username      |  optional | user username         |
> | password      |  optional | user password         |
> | email      |  optional | user email         |
> | nim      |  optional | user nim         |
> | role      |  optional | user role         |

##### Responses

> | response                                                            | description |
> |---------------------------------------------------------------------| ----------- |
> | `{id: string, name: string, username: string, password: string, email: string, nim: string, role: string, createdAt: string, updatedAt: string }` | user data |
> | `{ message: string }` | error message |

</details>

<details>
    <summary><code>PUT</code> <code><b>/users/me</b></code></summary>
    Updating User Data by Token

##### Body

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | token      |  required | user token         |
> | name      |  optional | user name         |
> | username      |  optional | user username         |
> | password      |  optional | user password         |
> | email      |  optional | user email         |
> | nim      |  optional | user nim         |
> | role      |  optional | user role         |

##### Responses

> | response                                                            | description |
> |---------------------------------------------------------------------| ----------- |
> | `{id: string, name: string, username: string, password: string, email: string, nim: string, role: string, createdAt: string, updatedAt: string }` | user data |
> | `{ message: string }` | error message |

</details>

<details>
    <summary><code>DELETE</code> <code><b>/users/:id</b></code></summary>
    Deleting User by ID

##### Parameters

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | id      |  required | user id         |

##### Body

> | name      |  type     | description |
> |-----------|-----------|------------ |
> | token      |  required | master token set in `.env`         |

##### Responses

> | response                                                            | description |
> |---------------------------------------------------------------------| ----------- |
> | `{ message: string }` | success message |
> | `{ message: string }` | error message |

</details>

