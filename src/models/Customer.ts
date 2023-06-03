import { Model, Optional, DataTypes, Sequelize } from 'sequelize';
import sequelizeConnection from '../config/db';

export class Customer extends Model {
	declare id: number;
	declare name: string;
	declare email: string;
}

Customer.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
}, { sequelize: sequelizeConnection, tableName: 'customers' });