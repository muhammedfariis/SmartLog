class Teamcontrollers {
  constructor(TeamServices) {
    this.TeamServices = TeamServices;
  }

  createDispatcher = async (req, res, next) => {
    try {
      const createdDisp = await this.TeamServices.createDispatcher({
        ...req.body,
      });

      res.json({
        success: true,
        ...createdDisp,
      });
    } catch (err) {
      next(err);
    }
  };

  createDriver = async (req, res, next) => {
    try {
      const createdDriver = await this.TeamServices.createDriver({
        ...req.body,
      });
      res.json({
        success: true,
        ...createdDriver,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteDriver = async (req, res, next) => {
    try {
      const deletedDriver = await this.TeamServices.deleteDriver(
        {id : req.params.id}
        

      );
      res.json({
        success: true,
        ...deletedDriver,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteDispatcher = async (req, res, next) => {
    try {
      const deletedDispatcher = await this.TeamServices.deleteDispatcher(
        {id : req.params.id}
      );
      res.json({
        success: true,
        ...deletedDispatcher,
      });
    } catch (err) {
      next(err);
    }
  };

  readDispatcher = async (req, res, next) => {
    try {
      const readDisp = await this.TeamServices.readDispatcher();
      res.json({
        success: true,
        ...readDisp,
      });
    } catch (err) {
      next(err);
    }
  };

  readDriver = async (req, res, next) => {
    try {
      const readDriver = await this.TeamServices.readDriver();
      res.json({
        success: true,
        ...readDriver,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default Teamcontrollers;
