# Express Server

## Entity Relationship Diagram
```mermaid
erDiagram
    user  {
        int id PK
        varchar username
        varchar password
        varchar email
        varchar regnum
        enum role
    }
    course {
        int id PK
        varchar name
        varchar code
    }
    courseclass {
        int id PK
        varchar code
        int courseId FK
    }
    coursechild {
        int id PK
        varchar name
        varchar description
        int classId FK
    }
    files {
        int id PK
        varchar name
        blob file
    }
    assignment {
        int id PK
        varchar name
        varchar description
        datetime deadline
    }
    user }|--o{ courseclass : teaching
    user }o--o{ courseclass : enroll
    course ||--|{ courseclass : part_of
    courseclass ||--o{ coursechild : contain
    coursechild ||--o{ files : contain
    coursechild ||--o{ assignment : assign
    assignment ||--o{ files : contain
```

#### Authenticating user

<details>
 <summary><code>POST</code> <code><b>/</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<master token set in .env>` |
##### Body

> | name | type | description |
> |-|-|-|
> | username | required | user username |
> | password | required | user password |


##### Responses

> | response | description |
> |-|-|
> | `{ token: string` | user is authenticated, returns jwt token |
> | `{ message: string }` | error message |
</details>

---

#### Users

<details>
 <summary><code>GET</code> <code><b>/users/me</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<user token>` |

##### Responses
> | response | description |
> |-|-|
> | `{ id: number, name: string, username: string, password: string, email: string, regnum: string, phone: string, birthdate: date, avatar: string, role: string, created_at: date, updated_at: date }` | user data |
> | `{ message: string }` | error message |
</details>

<details>
 <summary><code>PUT</code> <code><b>/users/me</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<user token>` |

##### Body
> | name | type | description |
> |-|-|-|
> | phone | optional | user phone |
> | avatar | optional | user avatar |

##### Responses
> | response | description |
> |-|-|
> | `{ id: number, name: string, username: string, password: string, email: string, regnum: string, phone: string, birthdate: date, avatar: string, role: string, created_at: date, updated_at: date }` | user data |
> | `{ message: string }` | error message |
</details>

---
#### Course

<details>
 <summary><code>GET</code> <code><b>/courses</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<user token>` |

##### Responses
> | response | description |
> |-|-|
> | `{ courses: [ { id: number, name: string, code: string, created_at: date, updated_at: date } ] }` | all courses data |
> | `{ message: string }` | error message |
</details>

<details>
 <summary><code>POST</code> <code><b>/courses</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<lecturer token>`

##### Body
> | name | type | description |
> |-|-|-|
> | name | required | course name |
> | code | required | course code |

##### Responses
> | response | description |
> |-|-|
> | `{ id: number, name: string, code: string, created_at: date, updated_at: date }` | course data |
> | `{ message: string }` | error message |
</details>

<details>
 <summary><code>GET</code> <code><b>/courses/:id</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<user token>` |

##### Responses
> | response | description |
> |-|-|
> | `{ id: number, name: string, code: string, created_at: date, updated_at: date }` | course data |

</details>

<details>
 <summary><code>PUT</code> <code><b>/courses/:id</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<lecturer token>` |

##### Body
> | name | type | description |
> |-|-|-|
> | name | optional | course name |
> | code | optional | course code |

##### Responses
> | response | description |
> |-|-|
> | `{ id: number, name: string, code: string, created_at: date, updated_at: date }` | course data |
> | `{ message: string }` | error message |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/courses/:id</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<lecturer token>` |

##### Responses
> | response | description |
> |-|-|
> | `{ message: string }` | success message |
> | `{ message: string }` | error message |

</details>

<details>
 <summary><code>POST</code> <code><b>/courses/:id</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<lecturer token>` |

##### Body
> | name | type | description |
> |-|-|-|
> | code | required | class code |

##### Responses
> | response | description |
> |-|-|
> | `{ id: number, code: string, courseId: number, created_at: date, updated_at: date }` | class data |
> | `{ message: string }` | error message |

</details>

<details>
 <summary><code>PUT</code> <code><b>/courses/:id/classes/:classId</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<lecturer token>` |

##### Body
> | name | type | description |
> |-|-|-|
> | code | optional | class code |

##### Responses
> | response | description |
> |-|-|
> | `{ id: number, code: string, courseId: number, created_at: date, updated_at: date }` | class data |
> | `{ message: string }` | error message |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/courses/:id/classes/:classId</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<lecturer token>` |

##### Responses
> | response | description |
> |-|-|
> | `{ message: string }` | success message |
> | `{ message: string }` | error message |

</details>

<details>
 <summary><code>POST</code> <code><b>/courses/:id/classes/:classId</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<lecturer token>` |

##### Body
> | name | type | description |
> |-|-|-|
> | name | required | class child name |
> | description | optional | class child description |

##### Responses
> | response | description |
> |-|-|
> | `{ id: number, name: string, description: string, classId: number, created_at: date, updated_at: date }` | class child data |

</details>

<details>
 <summary><code>PUT</code> <code><b>/courses/:id/classes/:classId/children/:childId</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<lecturer token>` |

##### Body
> | name | type | description |
> |-|-|-|
> | name | optional | class child name |
> | description | optional | class child description |

##### Responses
> | response | description |
> |-|-|
> | `{ id: number, name: string, description: string, classId: number, created_at: date, updated_at: date }` | class child data |

</details>

<details>
 <summary><code>DELETE</code> <code><b>/courses/:id/classes/:classId/children/:childId</b></code></summary>

##### Header
> | name | type | description |
> |-|-|-|
> | Authorization | required | Bearer `<lecturer token>` |

##### Responses
> | response | description |
> |-|-|
> | `{ message: string }` | success message |
> | `{ message: string }` | error message |

</details>






