import { tableModel } from "../db/schemas/reservationSchema.js";
import { NotFound, Registered } from "../errors/errors.js";

export class TableService {

    static async create(body) {
        const numberOfTableRegistered = await tableModel.find({ restaurant: body.restaurant, numberOfTable: body.numberOfTable })
        if (numberOfTableRegistered.length > 0) { throw new Registered("Table") }
        const table = new tableModel(body)
        return { table: await table.save(), succes: true }
    }

    static async get() {
        return { tables: await tableModel.find(), succes: true }
    }

    static async getOne(id) {
        const table = await tableModel.findById(id)
        if (table == null) { throw new NotFound("Table") }
        return { table: table, succes: true }
    }

    static async update(id, body) {
        const newtable = await tableModel.findByIdAndUpdate({ "_id": id }, body, { new: true, runValidators: true })
        if (!newtable || newtable.isModified === 0) { throw new NotFound("Table") }
        return { table: newtable, succes: true }
    }

    static async delete(id) {
        const response = await tableModel.deleteOne({ "_id": id })
        if (response.deletedCount === 0) { throw new NotFound("Table") }
        return { message: "table idenfied as: " + id + " deleted", succes: true }
    }
} 