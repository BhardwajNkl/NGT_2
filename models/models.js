const { DataTypes } = require('sequelize')
const sequelize = require('../DB/DBconfig');

const User = sequelize.define(
    'user',
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

const Project = sequelize.define(
    'project',
    {
        projectId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

const Attribute = sequelize.define(
    'attribute',
    {
        attributeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        attributeName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

const AttributeValue = sequelize.define(
    'attributeValue',
    {
        attributeValueId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        attributeValueName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

const DataItem = sequelize.define(
    'dataItem',
    {
        dataId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        col: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        row: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);
/* UserProject model:
This is the join table model for User and project mapping.
*/
// const UserProject = sequelize.define(
//     'user_project',
//     {

//     },
//     {
//         timestamps: false,
//         freezeTableName: true
//     }
// )

/*Result model:
Represents a resut in the application.
Every result is associated with a User[with role TEACHER] who has created it.
The relation between User to Result is one-to-many
*/
// const Result = sequelize.define(
//     'result',
//     {
//         resultId : {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },

//         studentName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },

//         rollNumber: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },

//         dob: {
//             type: DataTypes.DATEONLY,
//             allowNull: false
//         },

//         marks: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         }
//     },

//     {
//         freezeTableName: true,
//         timestamps: false
//     }
// )

// Let's define the User-Role many-to-many relationship.
// User.belongsToMany(Role, { through: UserRole });
// Role.belongsToMany(User, { through: UserRole });
User.hasMany(Project);
Project.belongsTo(User);
Project.hasMany(Attribute);
Attribute.belongsTo(Project);
Attribute.hasMany(AttributeValue);
AttributeValue.belongsTo(Attribute);
Project.hasMany(DataItem);
DataItem.belongsTo(Project);

// // And lastly, let's define the User-Result one-to-many mapping.
// User.hasMany(Result);
// Result.belongsTo(User);

// module.exports = { User, Role, Result };
module.exports = { User, Project };