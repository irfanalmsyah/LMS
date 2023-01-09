const sequelize = require('../configs/database');
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Course = require('../models/Course')
const CourseClass = require('../models/CourseClass')
const CourseChild = require('../models/CourseChild')
const Enrollment = require('../models/Enrollment')
const Teaching = require('../models/Teaching')
const gravatar = require('../middlewares/gravatar')

CourseClass.hasMany(CourseChild);
CourseChild.belongsTo(CourseClass);

Course.hasMany(CourseClass);
CourseClass.belongsTo(Course);

User.belongsToMany(CourseClass, { through: Enrollment});
CourseClass.belongsToMany(User, { through: Enrollment});

User.belongsToMany(CourseClass, { through: Teaching });
CourseClass.belongsToMany(User, { through: Teaching });

(async () => {
    await sequelize.sync();
    console.log('seeding')
    const salt = await bcrypt.genSalt(10)
    await User.bulkCreate([
        {
            id : 1,
            name : 'default admin',
            username : 'admin',
            password : bcrypt.hashSync('admin', salt),
            email : 'admin@admin.com',
            regnum: 'admin',
            birthdate: new Date(),
            avatar: gravatar('admin@admin.com'),
            role : 'admin'
        },
        {
            id : 2,
            name: 'ucup',
            username: 'ucup',
            password: bcrypt.hashSync('ucup', salt),
            email: 'ucup@gmail.com',
            regnum: 'G6401211998',
            birthdate: new Date(),
            avatar: gravatar('ucup@gmail.com'),
            role: 'student'
        },
        {
            id : 3,
            name: 'otong',
            username: 'otong',
            password: bcrypt.hashSync('otong', salt),
            email: 'otong@gmail.com',
            regnum: 'G6401211999',
            birthdate: new Date(),
            avatar: gravatar('otong@gmail.com'),
            role: 'student'
        },
        {
            id : 4,
            name: 'sule',
            username: 'sule',
            password: bcrypt.hashSync('sule', salt),
            email: 'sule@gmail.com',
            regnum: '1762761',
            birthdate: new Date(),
            avatar: gravatar('sule@gmail.com'),
            role: 'lecturer'
        },
        {
            id : 5,
            name: 'siti',
            username: 'siti',
            password: bcrypt.hashSync('siti', salt),
            email: 'siti@gmail.com',
            regnum: '1762762',
            birthdate: new Date(),
            avatar: gravatar('siti@gmail.com'),
            role: 'lecturer',
        },
        {
            id : 6,
            name: 'susi',
            username: 'susi',
            password: bcrypt.hashSync('susi', salt),
            email: 'susi@gmail.com',
            regnum: '1762763',
            birthdate: new Date(),
            avatar: gravatar('susi@gmail.com'),
            role: 'lecturer'
        }
    ]) 

    await Course.bulkCreate([
        {
            id : 1,
            name: 'Basis Data',
            code: 'IF-001',
        },
        {
            id : 2,
            name: 'Pemrograman Web',
            code: 'IF-002',
        }
    ])

    await CourseClass.bulkCreate([
        {
            id : 1,
            code : 'main',
            courseId : 1,
        },
        {
            id : 2,
            code : 'Paralel 1',
            courseId : 1,
        },
        {
            id : 3,
            code : 'Paralel 2',
            courseId : 1,
        },
        {
            id : 4,
            code : 'main',
            courseId : 2,
        },
        {
            id : 5,
            code : 'Paralel 1',
            courseId : 2,
        },
        {
            id : 6,
            code : 'Paralel 2',
            courseId : 2,
        }
    ])

    await CourseChild.bulkCreate([
        {
            id : 1,
            name : 'Pendahuluan',
            description : 'This is the pendahuluan for Basis Data',
            courseclassId : 1
        },
        {
            id : 2,
            name : 'Relational Model',
            description : 'This is the relational model for Basis Data',
            courseclassId : 1
        },
        {
            id : 3,
            name : 'Entity Relationship Model',
            description : 'This is the entity relationship model for Basis Data',
            courseclassId : 1
        },
        {
            id : 4,
            name : 'Khusus Paralel 1',
            description : 'This is the khusus paralel 1 for Basis Data',
            courseclassId : 2
        },
        {
            id : 5,
            name : 'Khusus Khusus Paralel 1',
            description : 'This is the khusus khusus paralel 1 for Basis Data',
            courseclassId : 2
        },
        {
            id : 6,
            name : 'Khusus Paralel 2',
            description : 'This is the khusus paralel 2 for Basis Data',
            courseclassId : 3
        },
        {
            id : 7,
            name : 'Khusus Khusus Paralel 2',
            description : 'This is the khusus khusus paralel 2 for Basis Data',
            courseclassId : 3
        },
        {
            id : 8,
            name : 'Pendahuluan',
            description : 'This is the pendahuluan for Pemrograman Web',
            courseclassId : 4
        },
        {
            id : 9,
            name : 'HTML',
            description : 'This is the HTML for Pemrograman Web',
            courseclassId : 4
        },
        {
            id : 10,
            name : 'CSS',
            description : 'This is the CSS for Pemrograman Web',
            courseclassId : 4
        },
        {
            id : 11,
            name : 'Khusus Paralel 1',
            description : 'This is the khusus paralel 1 for Pemrograman Web',
            courseclassId : 5
        },
        {
            id : 12,
            name : 'Khusus Khusus Paralel 1',
            description : 'This is the khusus khusus paralel 1 for Pemrograman Web',
            courseclassId : 5
        }
    ])

    await Teaching.bulkCreate([
        {
            id : 1,
            userId : 4,
            courseclassId : 1,
            date_enrolled : new Date(),
        },
        {
            id : 2,
            userId : 5,
            courseclassId : 1,
            date_enrolled : new Date(),
        },
        {
            id : 3,
            userId : 5,
            courseclassId : 2,
            date_enrolled : new Date(),
        },
        {
            id : 4,
            userId : 6,
            courseclassId : 1,
            date_enrolled : new Date(),
        },
        {
            id : 5,
            userId : 6,
            courseclassId : 3,
            date_enrolled : new Date(),
        },
        {
            id : 6,
            userId : 6,
            courseclassId : 4,
            date_enrolled : new Date(),
        },
        {
            id : 7,
            userId : 6,
            courseclassId : 5,
            date_enrolled : new Date(),
        },
        {
            id : 8,
            userId : 5,
            courseclassId : 4,
            date_enrolled : new Date(),
        },
        {
            id : 9,
            userId : 5,
            courseclassId : 6,
            date_enrolled : new Date(),
        }
    ])

    await Enrollment.bulkCreate([
        {
            userId : 2,
            courseclassId : 1,
            date_enrolled : new Date(),
        },
        {
            userId : 2,
            courseclassId : 2,
            date_enrolled : new Date(),
        },
        {
            userId : 3,
            courseclassId : 1,
            date_enrolled : new Date(),
        },
        {
            userId : 3,
            courseclassId : 3,
            date_enrolled : new Date(),
        },
        {
            userId : 3,
            courseclassId : 4,
            date_enrolled : new Date(),
        },
        {
            userId : 3,
            courseclassId : 5,
            date_enrolled : new Date(),
        },
        {
            userId : 2,
            courseclassId : 4,
            date_enrolled : new Date(),
        },
        {
            userId : 2,
            courseclassId : 6,
            date_enrolled : new Date(),
        }
    ])
    sequelize.close()
})()