
export const Messege = {

  // Auth
  REGISTER_SUCCESS: "User registered successfully",
  LOGIN_SUCCESS: "Login successful",
  INVALID_CREDENTIALS: "Invalid email or password",
  TOKEN_MISSING: "Authorization token missing",
  TOKEN_INVALID: "Invalid or expired token",
  ADMIN_EXIST : "admin already in db",

  // User / team management
  USER_NOT_FOUND: "User not found",
  DRIVER_LIST_FETCHED: "Drivers fetched successfully",
  USER_EXIST : "user already exist",
  USER_NOT_CREATED : "user not created",
  USER_CREATED : "user created",
  USER_FOUND : "user founded",
  USER_DELETED: "user deleted",
  USER_NOT_DELETED: "user not deleted",

  
  // Vehicles
  VEHICLE_CREATED: "Vehicle added to fleet",
  VEHICLE_UPDATED: "Vehicle updated successfully",
  VEHICLE_DELETED: "Vehicle retired successfully",
  VEHICLE_NOT_FOUND: "Vehicle not found",
  VEHICLE_ALREADY_FOUND : "this vehicle already saved",
  VEHICLE_NOT_CREATED : 'vehicles not created',
  VEHICLE_NOT_UPDATED : "vehicles not updated",
  VEHICLE_NOT_DELETED : "vehicles not deleted",
  VEHICLE_FOUND : "vehicles founded",
  VEHICLE_NOT_FOUNDED: "vehicles not founded",




  // assigning dispatcher 
  DELIVERY: "All delivery details",
  DELIVERY_ASSIGNED: "Delivery assigned successfully",
  DELIVERY_STATUS_UPDATED: "Delivery status updated",
  DELIVERY_NOT_FOUND: "Delivery not found",
  DRIVER_ALREADY_EXIST : "driver already assigned",



  // Fuel & Maintenance
  FUEL_LOGGED: "Fuel log saved successfully",
  MAINTENANCE_ALERTS_FETCHED: "Maintenance alerts fetched",
  MAINTENANCE_COMPLETED: "Vehicle serviced successfully",

  // Analytics
  FUEL_ANALYTICS_READY: "Fuel efficiency calculated",
  REVENUE_ANALYTICS_READY: "Revenue analytics generated",

  // General
  ACCESS_DENIED: "You do not have permission to perform this action",
  VALIDATION_ERROR: "Invalid request data",
  SERVER_ERROR: "Something went wrong",
};


export const Status = {
  OK: 200,                     // Successful GET, PUT, PATCH
  CREATED: 201,                // Resource created
  ACCEPTED: 202,               // Accepted but processing
  NO_CONTENT: 204,             // Deleted successfully

  BAD_REQUEST: 400,            // Validation errors
  UNAUTHORIZED: 401,           // Invalid / Missing token
  FORBIDDEN: 403,              // Role-based access denied
  NOT_FOUND: 404,              // Resource not found
  CONFLICT: 409,               // Duplicate data (email, vehicle no)

  INTERNAL_SERVER_ERROR: 500,  // Server crash / unhandled error
};


