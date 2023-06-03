import { Model, Optional, DataTypes, Sequelize } from 'sequelize';
import sequelizeConnection from '../config/db';

export class SpecialOffer extends Model {
	declare id: number;
	declare name: string;
	declare percent: number;
}

SpecialOffer.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	percent: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
},
	{
		sequelize: sequelizeConnection,
		tableName: 'special_offers',
		indexes: [
			{
				unique: false,
				fields: ['name']
			}
		]
	});

