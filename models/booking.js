const { required } = require("joi");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookingType: {
        type: String,
        enum: ["instant", "scheduled"],
        required: true
    },

    guestName: {
        type: String,
        required : true
    },

    guestEmail: {
        type: String,
        required:true
    },

    checkIn: {
        type: Date
    },
    checkOut: {
        type: Date
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "confirmed"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Booking", bookingSchema);