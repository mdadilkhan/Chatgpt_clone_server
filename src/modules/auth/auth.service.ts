import User,{IUser} from "../user/user.model";



export const getUser = async (email: string, provider?: string): Promise<IUser | null> => {
  const query: any = { email };
  if (provider) query.provider = provider;   // add only if passed
  return User.findOne(query).exec();
};

// Create new user
export const createUser = async (
  email: string,
  name: string,
  hashedPassword: string,
  isSocialLogin: boolean
): Promise<IUser> => {
  // If validation or duplicate error occurs, it will throw
  const user = await User.create({
    name,
    email,
    hashedPassword,
    isSocialLogin,
  });

  return user; // returns newly created user
};

export const createSocialAccountUser=async(name:string,email:string,provider:string,image:string):Promise<IUser>=>{

    
    const user = await User.create({
    name,
    email,
    provider,
    image,
    isSocialLogin: true,
  });

  return user; 
}