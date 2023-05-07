const mongoose = require('mongoose')

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    remote: {
      type: String,
      required: [true, 'Please select your preferable location'],
      enum: ['remote', 'onsite', 'Hybrid'],
    },
    numeAngajator: {
      type: String,
      required: [true, 'Nume angajator invalid'],
    },
    emailAngajator: {
      type: String,
      required: [true, 'Email angajator invalid'],
    },
    numeFirma: {
      type: String,
      required: [true, 'Nume firma invalid'],
    },
    numeJob: {
      type: String,
      required: [true, 'Nume job invalid'],
    },
    tipJob: {
      type: String,
      required: [true, 'Tip job invalid'],
    },
    locatie: {
      type: String,
      required: [true, 'Locatie invalida'],
    },
    anExperienta: {
      type: Number,
      required: [true, 'Ani experient invalizi'],
    },
    description: {
      type: String,
      required: [true, 'Nume angajator invalid'],
    },

    // status: {
    //   type: String,
    //   required: true,
    //   enum: ['new', 'open', 'closed'],
    //   default: 'new',
    // },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Job', jobSchema)
