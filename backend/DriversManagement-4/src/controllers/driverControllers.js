class DriverController {
  constructor(DriverServices) {
    this.DriverServices = DriverServices;
  }

  updateKm = async (req, res, next) => {
    try {
      const updatedKm = await this.DriverServices.updateKm({
        ...req.body,
      });

      res.json({
        success: true,
        updatedKm,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default DriverController