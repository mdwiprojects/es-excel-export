module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        sanctionloadinkw: String,
        phaseatpremesis: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const SalesIntake = mongoose.model("salesintake", schema);
    return SalesIntake;
  };
  