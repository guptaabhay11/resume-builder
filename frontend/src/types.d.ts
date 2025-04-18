declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: "USER" | "ADMIN";
    pdf?: string[];
    refreshToken: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
    
  export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
  }