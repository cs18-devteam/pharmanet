import { getRequestData } from "./getRequestData";
import { response } from "./response";

export default class Auth{




    constructor(){

    }
    #generateSalt = ()=> crypto.randomBytes(16).toString('hex');
    #hashPassword = ()=> crypto.createHash('sha256').update(password + salt).digest('hex');

    signup = async (req , res)=>{
        const {email , password} = JSON.parse(await getRequestData(req));

        if (!username || !password) return response(res , view('signup') , 400 );
        
    
    }
}



function handleSignup(req, res, body) {
    const { username, password } = JSON.parse(body);


    const users = readUsers();
    if (users.find(u => u.username === username)) {
        res.writeHead(400);
        return res.end('User already exists');
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);
    users.push({ username, salt, hashedPassword });
    saveUsers(users);

    res.writeHead(201);
    res.end('User signed up successfully');
}

function handleLogin(req, res, body) {
    const { username, password } = JSON.parse(body);
    const users = readUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
        res.writeHead(401);
        return res.end('Invalid username or password');
    }

    const hashedPassword = hashPassword(password, user.salt);
    if (hashedPassword !== user.hashedPassword) {
        res.writeHead(401);
        return res.end('Invalid username or password');
    }

    // Generate simple token (not JWT)
    const token = crypto.randomBytes(32).toString('hex');

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Login successful', token }));
}
