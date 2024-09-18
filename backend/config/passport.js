const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
require('dotenv').config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const prisma = new PrismaClient();
const SecretJWT = process.env.SECRET_JWT;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, async (username, password, cb) => {
    try {
        // ตรวจสอบข้อมูลการเข้าสู่ระบบกับ API ภายนอก
        const { data } = await axios.post('https://api.rmutsv.ac.th/elogin', {
            username,
            password
        });

        // ตรวจสอบผู้ใช้ในฐานข้อมูล
        let user = await prisma.Users.findFirst({
            where: { username: data.username }
        });

        if (!user) {
            // ถ้าผู้ใช้ไม่พบในฐานข้อมูล
            if (data.username && data.cid) {
                // สร้างผู้ใช้ใหม่
                user = await prisma.Users.create({
                    data: {
                        cid: data.cid,
                        username: data.username,
                        name: data.name,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        type: data.type,
                        faccode: data.faccode,
                        facname: data.facname,
                        depcode: data.depcode,
                        depname: data.depname,
                        seccode: data.seccode,
                        secname: data.secname,
                        email: data.email,
                    }
                });

                // ตรวจสอบและสร้างคณะถ้ายังไม่มี
                let faculty = await prisma.Faculties.findFirst({
                    where: { faccode: data.faccode }
                });

                if (!faculty && data.faccode && data.facname) {
                    await prisma.Faculties.create({
                        data: {
                            faccode: data.faccode,
                            facname: data.facname
                        }
                    });
                }

                // ตรวจสอบและสร้างสาขาถ้ายังไม่มี
                let department = await prisma.Departments.findFirst({
                    where: {
                        depcode: data.depcode,
                        seccode: data.seccode
                    }
                });

                if (!department && data.depcode && data.depname && data.seccode && data.secname) {
                    await prisma.Departments.create({
                        data: {
                            depcode: data.depcode,
                            depname: data.depname,
                            seccode: data.seccode,
                            secname: data.secname,
                            faccode: data.faccode // ตรวจสอบว่ามีฟิลด์นี้เพื่อเชื่อมโยงกับคณะ
                        }
                    });
                }


                // คืนค่าผู้ใช้ใหม่ที่ถูกสร้าง
                return cb(null, user, { message: 'Logged In Successfully' });
            }

            return cb(null, false, { message: 'Invalid username or password' });
        }

        // คืนค่าผู้ใช้ที่มีอยู่แล้ว
        return cb(null, user, { message: 'Logged In Successfully' });

    } catch (error) {
        return cb(error);
    }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SecretJWT
}, (jwtPayload, cb) => {
    try {
        return cb(null, jwtPayload.user);
    } catch (err) {
        return cb(err);
    }
}));
