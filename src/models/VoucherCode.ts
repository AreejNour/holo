import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../config/db';
import { Customer } from './Customer';
import { SpecialOffer } from './SpecialOffer';

export class VoucherCode extends Model {
	declare id: number;
	declare code: string;
	declare expiry_date: Date;
	declare is_used: boolean;
	declare used_at: Date;
}

VoucherCode.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	code: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	expiry_date: {
		type: DataTypes.DATE,
		allowNull: false
	},
	is_used: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	used_at: {
		type: DataTypes.DATE
	}
}, {
	sequelize: sequelizeConnection,
	tableName: 'voucher_codes',
	indexes: [
		{
			unique: true,
			fields: ['CustomerId', 'SpecialOfferId', 'code']
		},
		{
			unique: false,
			fields: ['CustomerId']
		},
		{
			unique: false,
			fields: ['SpecialOfferId']
		},
		{
			unique: true,
			fields: ['code']
		}
	]
});

VoucherCode.belongsTo(Customer);
VoucherCode.belongsTo(SpecialOffer);
