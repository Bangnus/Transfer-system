--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4

-- Started on 2024-10-30 17:43:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 88809)
-- Name: public; Type: SCHEMA; Schema: -; Owner: root
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO root;

--
-- TOC entry 867 (class 1247 OID 88825)
-- Name: TransferStatus; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public."TransferStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."TransferStatus" OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 235 (class 1259 OID 88913)
-- Name: Course; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Course" (
    id integer NOT NULL,
    "courseCode" text NOT NULL,
    "courseNameTH" text NOT NULL,
    "courseNameENG" text NOT NULL,
    "prerequisiteTH" text,
    "prerequisiteENG" text,
    credit integer NOT NULL,
    "descriptionTH" text,
    "descriptionENG" text,
    "groupId" integer NOT NULL
);


ALTER TABLE public."Course" OWNER TO root;

--
-- TOC entry 237 (class 1259 OID 88922)
-- Name: CourseTransfer; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."CourseTransfer" (
    id integer NOT NULL,
    "originalCourseId" integer,
    "transferredCourseId" integer,
    "specialtransferredCourseId" integer,
    description text,
    status public."TransferStatus" DEFAULT 'PENDING'::public."TransferStatus",
    "dateSubmitted" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."CourseTransfer" OWNER TO root;

--
-- TOC entry 236 (class 1259 OID 88921)
-- Name: CourseTransfer_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."CourseTransfer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CourseTransfer_id_seq" OWNER TO root;

--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 236
-- Name: CourseTransfer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."CourseTransfer_id_seq" OWNED BY public."CourseTransfer".id;


--
-- TOC entry 234 (class 1259 OID 88912)
-- Name: Course_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Course_id_seq" OWNER TO root;

--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 234
-- Name: Course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Course_id_seq" OWNED BY public."Course".id;


--
-- TOC entry 221 (class 1259 OID 88850)
-- Name: Departments; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Departments" (
    id integer NOT NULL,
    depcode text NOT NULL,
    depname text NOT NULL,
    seccode text NOT NULL,
    secname text NOT NULL,
    faccode text NOT NULL
);


ALTER TABLE public."Departments" OWNER TO root;

--
-- TOC entry 220 (class 1259 OID 88849)
-- Name: Departments_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Departments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Departments_id_seq" OWNER TO root;

--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 220
-- Name: Departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Departments_id_seq" OWNED BY public."Departments".id;


--
-- TOC entry 219 (class 1259 OID 88841)
-- Name: Faculties; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Faculties" (
    id integer NOT NULL,
    faccode text NOT NULL,
    facname text NOT NULL
);


ALTER TABLE public."Faculties" OWNER TO root;

--
-- TOC entry 218 (class 1259 OID 88840)
-- Name: Faculties_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Faculties_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Faculties_id_seq" OWNER TO root;

--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 218
-- Name: Faculties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Faculties_id_seq" OWNED BY public."Faculties".id;


--
-- TOC entry 233 (class 1259 OID 88904)
-- Name: Group; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Group" (
    id integer NOT NULL,
    name text NOT NULL,
    "subjectCategoryId" integer NOT NULL
);


ALTER TABLE public."Group" OWNER TO root;

--
-- TOC entry 232 (class 1259 OID 88903)
-- Name: Group_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Group_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Group_id_seq" OWNER TO root;

--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 232
-- Name: Group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Group_id_seq" OWNED BY public."Group".id;


--
-- TOC entry 239 (class 1259 OID 88933)
-- Name: Notification; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    message text,
    "isRead" boolean DEFAULT false NOT NULL,
    "userId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "StdCourseId" integer
);


ALTER TABLE public."Notification" OWNER TO root;

--
-- TOC entry 238 (class 1259 OID 88932)
-- Name: Notification_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Notification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notification_id_seq" OWNER TO root;

--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 238
-- Name: Notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Notification_id_seq" OWNED BY public."Notification".id;


--
-- TOC entry 229 (class 1259 OID 88886)
-- Name: SpecialCourse; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."SpecialCourse" (
    id integer NOT NULL,
    "courseCode" text NOT NULL,
    "courseNameTH" text NOT NULL,
    "courseNameENG" text NOT NULL,
    "prerequisiteTH" text,
    "prerequisiteENG" text,
    credit text,
    "descriptionTH" text,
    "descriptionENG" text,
    "SubSpecialtyGroupID" integer
);


ALTER TABLE public."SpecialCourse" OWNER TO root;

--
-- TOC entry 228 (class 1259 OID 88885)
-- Name: SpecialCourse_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."SpecialCourse_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SpecialCourse_id_seq" OWNER TO root;

--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 228
-- Name: SpecialCourse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."SpecialCourse_id_seq" OWNED BY public."SpecialCourse".id;


--
-- TOC entry 225 (class 1259 OID 88868)
-- Name: SpecialGroup; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."SpecialGroup" (
    id integer NOT NULL,
    name text NOT NULL,
    "SubjectCategoryID" integer NOT NULL,
    secname text
);


ALTER TABLE public."SpecialGroup" OWNER TO root;

--
-- TOC entry 224 (class 1259 OID 88867)
-- Name: SpecialGroup_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."SpecialGroup_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SpecialGroup_id_seq" OWNER TO root;

--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 224
-- Name: SpecialGroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."SpecialGroup_id_seq" OWNED BY public."SpecialGroup".id;


--
-- TOC entry 223 (class 1259 OID 88859)
-- Name: StudentCourse; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."StudentCourse" (
    id integer NOT NULL,
    "courseCode" text,
    "courseName" text NOT NULL,
    credit text,
    grade text,
    description text,
    "usernameId" text
);


ALTER TABLE public."StudentCourse" OWNER TO root;

--
-- TOC entry 222 (class 1259 OID 88858)
-- Name: StudentCourse_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."StudentCourse_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StudentCourse_id_seq" OWNER TO root;

--
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 222
-- Name: StudentCourse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."StudentCourse_id_seq" OWNED BY public."StudentCourse".id;


--
-- TOC entry 227 (class 1259 OID 88877)
-- Name: SubSpecialtyGroup; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."SubSpecialtyGroup" (
    id integer NOT NULL,
    name text NOT NULL,
    "SpecialGroupID" integer
);


ALTER TABLE public."SubSpecialtyGroup" OWNER TO root;

--
-- TOC entry 226 (class 1259 OID 88876)
-- Name: SubSpecialtyGroup_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."SubSpecialtyGroup_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SubSpecialtyGroup_id_seq" OWNER TO root;

--
-- TOC entry 3509 (class 0 OID 0)
-- Dependencies: 226
-- Name: SubSpecialtyGroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."SubSpecialtyGroup_id_seq" OWNED BY public."SubSpecialtyGroup".id;


--
-- TOC entry 231 (class 1259 OID 88895)
-- Name: SubjectCategory; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."SubjectCategory" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."SubjectCategory" OWNER TO root;

--
-- TOC entry 230 (class 1259 OID 88894)
-- Name: SubjectCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."SubjectCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SubjectCategory_id_seq" OWNER TO root;

--
-- TOC entry 3510 (class 0 OID 0)
-- Dependencies: 230
-- Name: SubjectCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."SubjectCategory_id_seq" OWNED BY public."SubjectCategory".id;


--
-- TOC entry 217 (class 1259 OID 88832)
-- Name: Users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    cid text,
    username text,
    name text,
    firstname text,
    lastname text,
    type text,
    faccode text,
    facname text,
    depcode text,
    depname text,
    seccode text,
    secname text,
    email text
);


ALTER TABLE public."Users" OWNER TO root;

--
-- TOC entry 216 (class 1259 OID 88831)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO root;

--
-- TOC entry 3511 (class 0 OID 0)
-- Dependencies: 216
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 215 (class 1259 OID 88810)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO root;

--
-- TOC entry 3276 (class 2604 OID 89016)
-- Name: Course id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Course" ALTER COLUMN id SET DEFAULT nextval('public."Course_id_seq"'::regclass);


--
-- TOC entry 3277 (class 2604 OID 89017)
-- Name: CourseTransfer id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CourseTransfer" ALTER COLUMN id SET DEFAULT nextval('public."CourseTransfer_id_seq"'::regclass);


--
-- TOC entry 3269 (class 2604 OID 89018)
-- Name: Departments id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Departments" ALTER COLUMN id SET DEFAULT nextval('public."Departments_id_seq"'::regclass);


--
-- TOC entry 3268 (class 2604 OID 89019)
-- Name: Faculties id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Faculties" ALTER COLUMN id SET DEFAULT nextval('public."Faculties_id_seq"'::regclass);


--
-- TOC entry 3275 (class 2604 OID 89020)
-- Name: Group id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Group" ALTER COLUMN id SET DEFAULT nextval('public."Group_id_seq"'::regclass);


--
-- TOC entry 3280 (class 2604 OID 89021)
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


--
-- TOC entry 3273 (class 2604 OID 89022)
-- Name: SpecialCourse id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SpecialCourse" ALTER COLUMN id SET DEFAULT nextval('public."SpecialCourse_id_seq"'::regclass);


--
-- TOC entry 3271 (class 2604 OID 89023)
-- Name: SpecialGroup id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SpecialGroup" ALTER COLUMN id SET DEFAULT nextval('public."SpecialGroup_id_seq"'::regclass);


--
-- TOC entry 3270 (class 2604 OID 89024)
-- Name: StudentCourse id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."StudentCourse" ALTER COLUMN id SET DEFAULT nextval('public."StudentCourse_id_seq"'::regclass);


--
-- TOC entry 3272 (class 2604 OID 89025)
-- Name: SubSpecialtyGroup id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SubSpecialtyGroup" ALTER COLUMN id SET DEFAULT nextval('public."SubSpecialtyGroup_id_seq"'::regclass);


--
-- TOC entry 3274 (class 2604 OID 89026)
-- Name: SubjectCategory id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SubjectCategory" ALTER COLUMN id SET DEFAULT nextval('public."SubjectCategory_id_seq"'::regclass);


--
-- TOC entry 3267 (class 2604 OID 89027)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3489 (class 0 OID 88913)
-- Dependencies: 235
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Course" (id, "courseCode", "courseNameTH", "courseNameENG", "prerequisiteTH", "prerequisiteENG", credit, "descriptionTH", "descriptionENG", "groupId") FROM stdin;
5	00-011-004	จักรยานเพื่อนันทนาการ	Leisure Cycling	\N	\N	1	แนะนำการขับขี่จักรยานเพื่อนันทนาการ เน้นจักรยานเพื่อความเพลิดเพลินและจักรยานภูเขา; ความรู้และทักษะในการใช้จักรยานเพื่อความเพลิดเพลิน การใช้งาน และการกีฬาในสภาพเส้นทางหลากหลาย; เทคนิคและทักษะในการขับขี่ เช่น การเบรก การให้สัญญาณ การใช้เกียร์ การถ่ายน้ำหนัก และการขับขี่ลู่เดี่ยว; การขับขี่อย่างปลอดภัยบนถนนและทักษะในการขับขี่เป็นกลุ่ม; กลไกของจักรยานและการบำรุงรักษา	Introduction to recreational riding, with emphasis on leisure cycling and mountain biking; knowledge and skills in using bicycles for pleasure, utility, and sport under various route conditions; riding techniques and skills including braking, signaling, gearing, weight transfer, and single-track riding; riding safety on open roadways and group riding skills; bike mechanisms and bike maintenance.	1
1	00-018-001	ศาสตร์พระราชา	The King’s Philosophy			3	ชีวิตและการทรงงานของพระบาทสมเด็จพระเจ้าอยู่หัวภูมิพลอดุลยเดช\nพระบรมราโชวาทและพระราชดำรัสในโอกาสต่าง ๆ พระราชกรณียกิจและโครงการ\nพัฒนาที่สำคัญ ความหมาย หลักการ แนวคิด และเป้าหมายของการพัฒนาที่ยั่งยืนและ\nการนำไปประยุกต์ใช้ มูลนิธิโครงการหลวง หลักการและแนวคิดของปรัชญาเศรษฐกิจ\nพอเพียง การนำศาสตร์พระราชาไปประยุกต์ใช้ในการดำรงชีพ	The life and work of His Majesty King Bhumibol Adulyadej; the royal guidance of His Majesty in various occasions; distinctive royal duties and development projects; the meaning, principles, concepts, and goals of sustainable development philosophy and its applications; the Royal Project Foundation of Thailand; the principles and concepts of the King's philosophy of sufficiency economy; and the applications of the King's philosophy for living.	1
2	00-011-001	ฟุตบอล	Football	\N	\N	1	หลักการพื้นฐาน ทักษะทางกายภาพ และเทคนิควิธีที่ใช้ในกีฬาฟุตบอล; ความรู้พื้นฐานทางวิทยาศาสตร์การกีฬาที่เกี่ยวข้องกับการสร้างเสริมสมรรถภาพทางกาย; กฎระเบียบ ข้อบังคับ มารยาท กลยุทธ์ เทคนิควิธี และการพัฒนาการเล่นกีฬาฟุตบอล; การจัดและการดำเนินการแข่งขัน	Basic fundamentals, physical skills, and techniques used in football; relevant sports science knowledge related to enhancing physical fitness; rules, regulations, etiquette, strategies, techniques, tactics, and development in the game of football; organizing and conducting football competitions.	1
3	00-011-002	ว่ายน้ำ	Swimming	\N	\N	1	หลักการพื้นฐาน ทักษะทางกายภาพ และเทคนิควิธีที่ใช้ในกีฬาว่ายน้ำ; ความรู้พื้นฐานทางวิทยาศาสตร์การกีฬาที่เกี่ยวข้องกับการสร้างเสริมสมรรถภาพทางกาย; กฎระเบียบ ข้อบังคับ มารยาท กลยุทธ์ เทคนิควิธี และการพัฒนาการเล่นกีฬาว่ายน้ำ; การจัดและการดำเนินการแข่งขัน	Basic fundamentals, physical skills, and techniques used in swimming; relevant sports science knowledge related to enhancing physical fitness; rules, regulations, etiquette, strategies, techniques, tactics, and development in the sport of swimming; organizing and conducting swimming competitions.	1
4	00-011-003	กีฬาลีลาศ	DanceSport	\N	\N	1	หลักการและการฝึกปฏิบัติเทคนิคลีลาศแบบมาตรฐานและละติน; ลักษณะและรูปแบบของดนตรีประกอบการลีลาศ; ความสัมพันธ์ระหว่างดนตรีกับลีลาศ; องค์ประกอบของการลีลาศ เช่น การก้าวเท้า การทรงตัว การวางท่า การเหนี่ยวรั้ง และการกะเวลา; การวางตัวและรูปแบบของการก้าวเท้า; จังหวะและลีลา; ดุลยภาพระหว่างการทำงานของกล้ามเนื้อและหัวใจ; กฎ กติกา และมารยาทของกีฬาลีลาศ	Principles and practices in standard and Latin dance techniques; character and style of music for dance; the relationship between music and dance; elements of dance, including footwork, poise, posture, hold, and timing; dance positions and basic step patterns; rhythm and styles; a unique balance between cardiovascular and muscular activity; rules, regulations, and etiquette.	1
6	00-011-005	บาสเกตบอล	Basketball	\N	\N	1	หลักการพื้นฐาน ทักษะทางกายภาพ และเทคนิควิธีที่ใช้ในกีฬาบาสเกตบอล; ความรู้พื้นฐานทางวิทยาศาสตร์การกีฬาที่เกี่ยวข้องกับการสร้างเสริมสมรรถภาพทางกาย; กฎระเบียบ ข้อบังคับ มารยาท กลยุทธ์ เทคนิควิธี และการพัฒนาการเล่นกีฬาบาสเกตบอล; การจัดและการดำเนินการแข่งขัน	Basic fundamentals, physical skills, and techniques used in basketball; relevant sports science knowledge related to enhancing physical fitness; rules, regulations, etiquette, strategies, techniques, tactics, and development in the game of basketball; organizing and conducting basketball competitions.	1
7	00-011-006	ตะกร้อ	Takraw	\N	\N	1	หลักการพื้นฐาน ทักษะทางกายภาพ และเทคนิควิธีที่ใช้ในกีฬาตะกร้อ; ความรู้พื้นฐานทางวิทยาศาสตร์การกีฬาที่เกี่ยวข้องกับการสร้างเสริมสมรรถภาพทางกาย; กฎระเบียบ ข้อบังคับ มารยาท กลยุทธ์ เทคนิควิธี และการพัฒนาการเล่นกีฬาตะกร้อ; การจัดและการดำเนินการแข่งขัน	Basic fundamentals, physical skills, and techniques used in takraw; relevant sports science knowledge related to enhancing physical fitness; rules, regulations, etiquette, strategies, techniques, tactics, and development in the game of takraw; organizing and conducting takraw competitions.	1
8	00-011-007	แบดมินตัน	Badminton	\N	\N	1	หลักการพื้นฐาน ทักษะทางกายภาพ และเทคนิควิธีที่ใช้ในกีฬาแบดมินตัน; ความรู้พื้นฐานทางวิทยาศาสตร์การกีฬาที่เกี่ยวข้องกับการสร้างเสริมสมรรถภาพทางกาย; กฎระเบียบ ข้อบังคับ มารยาท กลยุทธ์ เทคนิควิธี และการพัฒนาการเล่นกีฬาแบดมินตัน; การจัดและการดำเนินการแข่งขัน\n\n	Basic fundamentals, physical skills, and techniques used in badminton; relevant sports science knowledge related to enhancing physical fitness; rules, regulations, etiquette, strategies, techniques, tactics, and development in the game of badminton; organizing and conducting badminton competitions.	1
9	00-011-008	วอลเลย์บอล	Volleyball	\N	\N	1	หลักการพื้นฐาน ทักษะทางกายภาพ และเทคนิควิธีที่ใช้ในกีฬาวอลเลย์บอล; ความรู้พื้นฐานทางวิทยาศาสตร์การกีฬาที่เกี่ยวข้องกับการสร้างเสริมสมรรถภาพทางกาย; กฎระเบียบ ข้อบังคับ มารยาท กลยุทธ์ เทคนิควิธี และการพัฒนาการเล่นกีฬาวอลเลย์บอล; การจัดและการดำเนินการแข่งขัน	Basic fundamentals, physical skills, and techniques used in volleyball; relevant sports science knowledge related to enhancing physical fitness; rules, regulations, etiquette, strategies, techniques, tactics, and development in the game of volleyball; organizing and conducting volleyball competitions.	1
10	00-011-009	ฟุตซอล	Futsal	\N	\N	1	หลักการพื้นฐาน ทักษะทางกายภาพ และเทคนิควิธีที่ใช้ในกีฬาฟุตซอล; ความรู้พื้นฐานทางวิทยาศาสตร์การกีฬาที่เกี่ยวข้องกับการสร้างเสริมสมรรถภาพทางกาย; กฎระเบียบ ข้อบังคับ มารยาท กลยุทธ์ เทคนิควิธี และการพัฒนาการเล่นกีฬาฟุตซอล; การจัดและการดำเนินการแข่งขัน\n\n	Basic fundamentals, physical skills, and techniques used in futsal; relevant sports science knowledge related to enhancing physical fitness; rules, regulations, etiquette, strategies, techniques, tactics, and development in the game of futsal; organizing and conducting futsal competitions.	1
11	00-011-010	เทนนิส	Tennis	\N	\N	1	หลักการพื้นฐาน ทักษะทางกายภาพ และเทคนิควิธีที่ใช้ในกีฬาเทนนิส; ความรู้พื้นฐานทางวิทยาศาสตร์การกีฬาที่เกี่ยวข้องกับการสร้างเสริมสมรรถภาพทางกาย; กฎระเบียบ ข้อบังคับ มารยาท กลยุทธ์ เทคนิควิธี และการพัฒนาการเล่นกีฬาเทนนิส; การจัดและการดำเนินการแข่งขัน\n\n	Basic fundamentals, physical skills, and techniques used in tennis; relevant sports science knowledge related to enhancing physical fitness; rules, regulations, etiquette, strategies, techniques, tactics, and development in the game of tennis; organizing and conducting tennis competitions.	1
12	00-011-011	กอล์ฟ	Golf	\N	\N	1	ความรู้ทั่วไปและทักษะในการเล่นกอล์ฟ; การพัฒนาร่างกายและอารมณ์จากการเล่นกอล์ฟ; วงสวิง; การเลือกใช้ไม้กอล์ฟที่เหมาะสม; การจับไม้กอล์ฟ ท่ายืน และการวางตำแหน่งลำตัว; การพัตกอล์ฟ; การตีลูกสั้นและลูกยาว; การตีลูกจากอุปสรรคและกรณีพิเศษ; กฎกติกามารยาทของกอล์ฟ	General knowledge and skills of golf; physical and emotional benefits from golf; golf swing; how to choose the correct golf clubs; proper grips, stance, and alignment; stroke production for putting, short game, and long game; hitting special shots; rules and etiquette of golf.	1
13	00-012-001	สารัตถะแห่งความงาม	Beauty Matters	\N	\N	3	ธรรมชาติของความงามตามภววิสัยและจิตวิสัย; ความงามและรสนิยม; ความงามของมนุษย์; ความงามตามธรรมชาติและความงามสร้างสรรค์; คุณค่าของความงามและสุนทรียะในภาษา วรรณกรรม ดนตรี ศิลปกรรม นาฏศิลป์ และการละเล่นพื้นบ้าน; สุขภาพกายและสุขภาพจิต; การดูแลสุขภาพ; มารยาทงามตามคติของไทยและการอยู่ร่วมกันอย่างมีความสุข	Nature of beauty, objective and subjective aspects; beauty and taste; human beauty; natural beauty and constructed beauty; aesthetic values of beauty in languages, literature, music, visual arts, performing arts, and folk entertainment; physical and mental well-being; health care; Thai etiquette and peaceful co-existence.	1
14	00-012-002	ดนตรีเพื่อชีวิต	Music for Life	\N	\N	3	พื้นฐานความรู้ที่จำเป็นสำหรับดนตรี; ดนตรีและสุนทรียศาสตร์; เนื้อหาและรูปแบบของดนตรีตะวันตก, ดนตรีไทย และดนตรีพื้นบ้าน; ทักษะในการอ่านภาษาดนตรี; การฝึกหัดและเล่นดนตรีเฉพาะชิ้น; เทคนิคในการเล่นดนตรี; การเล่นดนตรีเป็นกลุ่มวง; การเล่นและแสดงดนตรีในรูปแบบต่าง ๆ\n\n	Basic elements of music; music and aesthetics; contents and forms of Western music, Thai music, and folk music; music reading skills; individual practice and performance of a particular instrument; playing techniques; ensemble playing; recital and performance in various forms of music.	1
15	00-013-001	ชีวิตกับเศรษฐกิจพอเพียง	Life and Sufficiency Economy	\N	\N	3	ความเป็นมาและปรัชญาเศรษฐกิจพอเพียง; วิวัฒนาการของโครงสร้างระบบเศรษฐกิจไทย; การนำปรัชญาเศรษฐกิจพอเพียงมาประยุกต์ใช้ในชีวิตและชุมชน; การบริหารจัดการที่ดี; การพัฒนาเศรษฐกิจพอเพียงในระดับบุคคล ครอบครัว และชุมชน; โครงการพระราชดำริและการนำมาใช้ในภาคธุรกิจการเกษตรและอุตสาหกรรม; กรณีศึกษาเศรษฐกิจพอเพียงของชุมชน	Background of the philosophy of sufficiency economy; development of the Thai economic structure; applications of sufficiency economy for living in families and communities; good governance practices in organizations; developing sufficiency economy at the individual, family, and community levels; royal-initiated projects and their applications in agribusiness and industrial sectors; case study of sufficiency economy in the community.	1
16	00-013-002	เศรษฐศาสตร์ในชีวิตประจำวัน	Economics for Everyday Use	\N	\N	3	ความรู้ทั่วไปเกี่ยวกับเศรษฐศาสตร์; อรรถประโยชน์ การตัดสินใจ และต้นทุนค่าเสียโอกาส; บทบาทของรัฐบาลและองค์กรทางธุรกิจในระบบเศรษฐกิจ; การพิทักษ์สิทธิ์และผลประโยชน์ของผู้บริโภค; เศรษฐกิจครัวเรือน; เศรษฐศาสตร์สำหรับผู้ประกอบการ; กระบวนการวางแผนทางการเงิน; การบริหารรายได้ รายจ่าย และภาระหนี้สิน; การเงินและการธนาคาร; กลไกราคากับการประยุกต์ในชีวิตประจำวัน	General knowledge of economics; utility, decision making, and opportunity cost; roles of government and economic organizations in economic systems; consumer rights and benefits protection; household economy; economics for entrepreneurs; financial planning process; income, expenditure, and debt management; finance and banking; price mechanism and applications in everyday situations.	1
17	00-018-002	อรรถรสในงานศิลปะ	Aesthetics in Art	\N	\N	3	ลักษณะของศิลปะ; ประเภทของงานศิลปะ; รสนิยมของมนุษย์; คุณค่าทางสุนทรียภาพเกี่ยวกับความงาม, ความสละสลวย, ความเป็นเลิศ, ความน่าสลด, โศกนาฏกรรม, ความตลกขบขัน, และความเศร้าสลด; ศิลปะวิจักษ์; คุณค่าทางคุณธรรมและคุณค่าทางปัญญาของงานศิลปะ; การพัฒนาและการวินิจฉัยสุนทรียศาสตร์; ความสัมพันธ์ระหว่างศิลปะกับวัฒนธรรม	The nature of art; classification of artwork; personal taste; aesthetic evaluation in beauty, elegance, sublime, horrible, tragedy, comedy, and dreariness; art interpretation; moral and cognitive values of art; aesthetic experience development and judgment; culture and art interaction.\n\n	1
19	00-018-004	ผู้นำนันทนาการ	Recreation Leadership	\N	\N	3	ความรู้และทักษะสำหรับผู้นำนันทนาการ; บทบาทของผู้นำในการติดต่อสื่อสารระหว่างบุคคลและองค์กร; ทฤษฎีแรงจูงใจและกระบวนการกลุ่ม; การเตรียมตัวเพื่อกิจกรรมกลางแจ้งและการเดินทาง; การบริหารจัดการนันทนาการ; การจัดการความปลอดภัยและความเสี่ยง	Knowledge and skills for recreation leadership; roles of leader in interpersonal and organizational communication; motivation theories and group dynamics; preparation for outdoor activities and trips; recreation management; safety and risk management.\n\n	1
20	00-018-005	สมาธิเพื่อการพัฒนาชีวิต	Meditation for Life Development	\N	\N	3	ประวัติและแนวความคิดเกี่ยวกับการฝึกสมาธิ; การฝึกสมาธิแบบต่าง ๆ; คุณประโยชน์ที่ได้จากการทำสมาธิ; ความรู้พื้นฐาน รูปแบบ วิธีการ และขั้นตอนของการทำสมาธิ; การรับรู้ อารมณ์ และการปรับแนวคิด; ความสัมพันธ์ระหว่างสมาธิ ความเครียด และสุขภาพ; การบริกรรมและการทำสมาธิ; การฝึกสมาธิและการเจริญสติ; การวางท่าที่เหมาะสม เทคนิคการหายใจและการผ่อนคลาย; การฝึกสมาธิเพื่อนำทางไปสู่การรู้แจ้ง; การฝึกสมาธิในชีวิตประจำวันเพื่อความสุขของร่างกาย จิตใจ และจิตวิญญาณ	History and concepts of meditation; types of meditation; meditation benefits; basic knowledge, patterns, methods, and steps of meditation; feelings, emotions, and proper mindset; the relationship between meditation, stress, and health; recitation and meditation; mindfulness and meditation; proper meditation postures, breathing, and relaxation techniques; meditation on the path to enlightenment; meditation practice in everyday life for a happy body, mind, and soul.\n\n	1
18	00-018-003	การส่งเสริมสุขภาพและการออกกำลังกาย	Health Promotion and Exercise	\N	\N	3	ภาพรวมของการสร้างเสริมสุขภาพ; องค์ประกอบสมรรถภาพทางกาย; สุขภาพกายและสุขภาพจิต; สุขภาพกับชีวิต; หลักการและวิธีการออกกำลังกาย, เกมส์, กีฬา และการพักผ่อนหย่อนใจ; การออกกำลังกายและกีฬาเพื่อสุขภาพ; ปัญหาทางสุขภาพเกี่ยวกับอาหารและโภชนาการ; ยาและสารเสพติด; การวางแผนและการประเมินสุขภาพ; การออกแบบโปรแกรมการออกกำลังกายและการกีฬา; การพัฒนากิจกรรมส่งเสริมสุขภาพในระดับท้องถิ่นและระดับประเทศ	Overview of health promotion; physical fitness components; physical and mental health; health and life; principles and methods of physical fitness, games, sport, and recreation; exercise and sport for health; health problems involving food and nutrition; drugs and addictions; health promotion planning and evaluation; exercise and sport program design; health promotion development at the local and national level.	1
\.


--
-- TOC entry 3491 (class 0 OID 88922)
-- Dependencies: 237
-- Data for Name: CourseTransfer; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."CourseTransfer" (id, "originalCourseId", "transferredCourseId", "specialtransferredCourseId", description, status, "dateSubmitted") FROM stdin;
21	22	5	\N		APPROVED	2024-10-29 15:43:55.595
\.


--
-- TOC entry 3475 (class 0 OID 88850)
-- Dependencies: 221
-- Data for Name: Departments; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Departments" (id, depcode, depname, seccode, secname, faccode) FROM stdin;
1	1501	วิศวกรรม	150105	วิศวกรรมคอมพิวเตอร์และการสื่อสาร	15
\.


--
-- TOC entry 3473 (class 0 OID 88841)
-- Dependencies: 219
-- Data for Name: Faculties; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Faculties" (id, faccode, facname) FROM stdin;
1	15	คณะวิศวกรรมศาสตร์และเทคโนโลยี
\.


--
-- TOC entry 3487 (class 0 OID 88904)
-- Dependencies: 233
-- Data for Name: Group; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Group" (id, name, "subjectCategoryId") FROM stdin;
1	กลุ่มวิชาคุณภพชีวิตดี มีสุข	1
2	กลุ่มวิชาพลเมืองดี วิถีประชาธิปไตย	1
3	กลุ่มวิชาภาษาและการสื่อสาร	1
4	กลุ่มวิชาวิทยาศาสตร์และเทคโนโลยี	1
\.


--
-- TOC entry 3493 (class 0 OID 88933)
-- Dependencies: 239
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Notification" (id, message, "isRead", "userId", "createdAt", "StdCourseId") FROM stdin;
19	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-29 06:03:54.46	\N
21	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-29 06:29:45.047	\N
22	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-29 15:43:55.616	22
6	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-28 14:58:51.938	\N
7	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-28 23:22:16.883	\N
8	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-28 23:47:42.355	\N
9	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-28 23:50:38.806	\N
10	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-28 23:57:16.141	\N
11	ได้เพิ่มข้อมูลใหม่	f	s667415850045	2024-10-29 00:05:35.283	\N
12	ได้เพิ่มข้อมูลใหม่	f	s667415850045	2024-10-29 00:06:16.597	\N
16	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-29 00:22:06.066	\N
15	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-29 00:19:30.62	\N
14	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-29 00:18:45.714	\N
13	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-29 00:14:55.819	\N
17	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-29 00:41:30.818	\N
18	ได้เพิ่มข้อมูลใหม่	f	s667415850045	2024-10-29 05:51:00.229	\N
20	ได้เพิ่มข้อมูลใหม่	t	s667415850045	2024-10-29 06:19:38.041	\N
\.


--
-- TOC entry 3483 (class 0 OID 88886)
-- Dependencies: 229
-- Data for Name: SpecialCourse; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."SpecialCourse" (id, "courseCode", "courseNameTH", "courseNameENG", "prerequisiteTH", "prerequisiteENG", credit, "descriptionTH", "descriptionENG", "SubSpecialtyGroupID") FROM stdin;
1	02-211-002	คณิตศาสตร์ 1	Mathematics I	\N	\N	3	พีชคณิตเวกเตอร์สามมิติ; ลิมิตและความต่อเนื่อง; การหาอนุพันธ์และปริพันธ์ของฟังก์ชันค่าจริงและฟังก์ชันค่าเวกเตอร์ และการประยุกต์; การประยุกต์อนุพันธ์; รูปแบบยังไม่กำหนด; เทคนิคในการปริพันธ์; การหาปริพันธ์เชิงตัวเลข	Vector algebra in three dimensions; limits and continuity; differentiation and integration of real-valued and vector-valued functions of a real variable and their applications; applications of derivatives; indeterminate forms; techniques of integration; numerical integration.\n\n	6
2	15-122-201	ระบบฐานข้อมูล	Database Systems	\N	\N	3	สถาปัตยกรรมของระบบฐานข้อมูล; การบริหารฐานข้อมูล; โครงสร้างของโมเดลเชิงสัมพันธ์; ภาษาเอสคิวแอล; การออกแบบฐานข้อมูล; ฟังก์ชันการขึ้นต่อกัน; กฎความคงสภาพ; การควบคุมภาวะพร้อมกัน; การนอร์มัลไลซ์; โมเดลแบบอีอาร์; การป้องกันข้อมูล; ระบบความปลอดภัย; การกู้คืนข้อมูล; การเข้าถึงข้อมูลและการเรียกค้นข้อมูล; การออกแบบฐานข้อมูลแบบโนเอสคิวแอล; การแปลงโครงสร้างข้อมูลเอสคิวแอลเป็นโครงสร้างข้อมูลไฟร์เบส; การประยุกต์ใช้งานฐานข้อมูลไฟร์เบส; ฝึกปฏิบัติการประยุกต์ใช้ระบบฐานข้อมูล	Database architecture; database administration; structure of relational data model; SQL language; database design; functional dependency rules; data integrity rules; concurrency control; normalization; ER model; data protection; security systems; data recovery; data access and data retrieval; database design with NoSQL; converting SQL structures to Firebase structures; database development with Firebase; hands-on practice in database systems applications.	1
3	15-122-402	อินเทอร์เน็ตของสรรพสิ่งและระบบคลาวด์	Internet of Things and Cloud Computing	15-125-303 ระบบไมโครคอมพิวเตอร์และสมองกลฝังตัว	15-125-303 Microcomputer and Embedded Systems	3	แนะนำเกี่ยวกับอินเทอร์เน็ตของสรรพสิ่งและระบบคลาวด์; ความสัมพันธ์ระหว่างอินเทอร์เน็ตของสรรพสิ่ง, ระบบคลาวด์, และข้อมูลขนาดใหญ่; แพลตฟอร์มสำหรับอินเทอร์เน็ตของสรรพสิ่ง; ลำดับชั้นและองค์ประกอบสถาปัตยกรรมอินเทอร์เน็ตของสรรพสิ่ง; สถาปัตยกรรมระบบคลาวด์; ระบบสมองกลฝังตัวในระบบอินเทอร์เน็ตของสรรพสิ่ง; การเขียนโปรแกรมและการหาข้อบกพร่องในระบบสมองกลฝังตัว; การรับและใช้ประโยชน์ข้อมูล; การประยุกต์ใช้งานอินเทอร์เน็ตของสรรพสิ่ง	Introduction to Internet of Things (IoT) and Cloud; the relationship between IoT, Cloud Computing, and Big Data; IoT Cloud Platforms; IoT architecture layers and components; Cloud Computing architecture; embedded programming in the IoT; basics of debugging embedded systems; data collection; acquiring and utilizing data; Internet of Things applications.	1
\.


--
-- TOC entry 3479 (class 0 OID 88868)
-- Dependencies: 225
-- Data for Name: SpecialGroup; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."SpecialGroup" (id, name, "SubjectCategoryID", secname) FROM stdin;
1	กลุ่มวิชาแกนทางวิศวกรรม	2	\N
2	กลุ่มวิชาเฉพาะด้าน	2	\N
3	กลุ่มวิชาชีพเลือก	2	\N
\.


--
-- TOC entry 3477 (class 0 OID 88859)
-- Dependencies: 223
-- Data for Name: StudentCourse; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."StudentCourse" (id, "courseCode", "courseName", credit, grade, description, "usernameId") FROM stdin;
22	101-110	test	1	4.0	xxx	s667415850045
\.


--
-- TOC entry 3481 (class 0 OID 88877)
-- Dependencies: 227
-- Data for Name: SubSpecialtyGroup; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."SubSpecialtyGroup" (id, name, "SpecialGroupID") FROM stdin;
1	กลุ่มวิชาเทคโนโลยีเพื่องานประยุกต์	2
2	กลุ่มวิชาเทคโนโลยีและวิธีการทางซอฟแวร์	2
3	กล่มวิชาโครงสร้างพื้นฐานของระบบ	2
4	กลุ่มวิชาฮาร์ดแวร์และสถาปัตยกรรมคอมพิวเตอร์	2
5	กลุ่มวิชาโครงงานและฝึกประสบการณ์วิชาชีพ	2
6	กลุ่มวิชาแกนทางวิศวกรรม	1
7	กลุ่มวิชาชีพเลือก	3
\.


--
-- TOC entry 3485 (class 0 OID 88895)
-- Dependencies: 231
-- Data for Name: SubjectCategory; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."SubjectCategory" (id, name) FROM stdin;
1	หมวดวิชาศึกษาทั่วไป
2	หมวดวิชาเฉพาะ
\.


--
-- TOC entry 3471 (class 0 OID 88832)
-- Dependencies: 217
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Users" (id, cid, username, name, firstname, lastname, type, faccode, facname, depcode, depname, seccode, secname, email) FROM stdin;
1	1909802950360	s667415850045	สุภัสสรา ทรัพย์สิน	สุภัสสรา	ทรัพย์สิน	student	15	คณะวิศวกรรมศาสตร์และเทคโนโลยี	1501	วิศวกรรม	150105	วิศวกรรมคอมพิวเตอร์และการสื่อสาร	suphatsara.sa@rmutsvmail.com
2	1819900510420	s667415850014	พีรพัฒน์ และเล็ม	พีรพัฒน์	และเล็ม	staff	15	คณะวิศวกรรมศาสตร์และเทคโนโลยี	1501	วิศวกรรม	150105	วิศวกรรมคอมพิวเตอร์และการสื่อสาร	peerapat.la@rmutsvmail.com
\.


--
-- TOC entry 3469 (class 0 OID 88810)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
4ab75227-15f0-4161-b4cf-a3a4a19cd078	fa25daf48365be498234e43e8d6f3ed02a3e4bcc64a90a77c567b1607bc08158	2024-10-28 05:37:08.057517+00	20241028053707_addtable	\N	\N	2024-10-28 05:37:07.963012+00	1
\.


--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 236
-- Name: CourseTransfer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."CourseTransfer_id_seq"', 21, true);


--
-- TOC entry 3513 (class 0 OID 0)
-- Dependencies: 234
-- Name: Course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Course_id_seq"', 20, true);


--
-- TOC entry 3514 (class 0 OID 0)
-- Dependencies: 220
-- Name: Departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Departments_id_seq"', 1, true);


--
-- TOC entry 3515 (class 0 OID 0)
-- Dependencies: 218
-- Name: Faculties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Faculties_id_seq"', 1, true);


--
-- TOC entry 3516 (class 0 OID 0)
-- Dependencies: 232
-- Name: Group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Group_id_seq"', 4, true);


--
-- TOC entry 3517 (class 0 OID 0)
-- Dependencies: 238
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 22, true);


--
-- TOC entry 3518 (class 0 OID 0)
-- Dependencies: 228
-- Name: SpecialCourse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."SpecialCourse_id_seq"', 3, true);


--
-- TOC entry 3519 (class 0 OID 0)
-- Dependencies: 224
-- Name: SpecialGroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."SpecialGroup_id_seq"', 3, true);


--
-- TOC entry 3520 (class 0 OID 0)
-- Dependencies: 222
-- Name: StudentCourse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."StudentCourse_id_seq"', 22, true);


--
-- TOC entry 3521 (class 0 OID 0)
-- Dependencies: 226
-- Name: SubSpecialtyGroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."SubSpecialtyGroup_id_seq"', 7, true);


--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 230
-- Name: SubjectCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."SubjectCategory_id_seq"', 2, true);


--
-- TOC entry 3523 (class 0 OID 0)
-- Dependencies: 216
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);


--
-- TOC entry 3311 (class 2606 OID 88931)
-- Name: CourseTransfer CourseTransfer_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CourseTransfer"
    ADD CONSTRAINT "CourseTransfer_pkey" PRIMARY KEY (id);


--
-- TOC entry 3309 (class 2606 OID 88920)
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- TOC entry 3294 (class 2606 OID 88857)
-- Name: Departments Departments_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Departments"
    ADD CONSTRAINT "Departments_pkey" PRIMARY KEY (id);


--
-- TOC entry 3291 (class 2606 OID 88848)
-- Name: Faculties Faculties_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Faculties"
    ADD CONSTRAINT "Faculties_pkey" PRIMARY KEY (id);


--
-- TOC entry 3307 (class 2606 OID 88911)
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY (id);


--
-- TOC entry 3313 (class 2606 OID 88942)
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- TOC entry 3303 (class 2606 OID 88893)
-- Name: SpecialCourse SpecialCourse_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SpecialCourse"
    ADD CONSTRAINT "SpecialCourse_pkey" PRIMARY KEY (id);


--
-- TOC entry 3299 (class 2606 OID 88875)
-- Name: SpecialGroup SpecialGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SpecialGroup"
    ADD CONSTRAINT "SpecialGroup_pkey" PRIMARY KEY (id);


--
-- TOC entry 3297 (class 2606 OID 88866)
-- Name: StudentCourse StudentCourse_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."StudentCourse"
    ADD CONSTRAINT "StudentCourse_pkey" PRIMARY KEY (id);


--
-- TOC entry 3301 (class 2606 OID 88884)
-- Name: SubSpecialtyGroup SubSpecialtyGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SubSpecialtyGroup"
    ADD CONSTRAINT "SubSpecialtyGroup_pkey" PRIMARY KEY (id);


--
-- TOC entry 3305 (class 2606 OID 88902)
-- Name: SubjectCategory SubjectCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SubjectCategory"
    ADD CONSTRAINT "SubjectCategory_pkey" PRIMARY KEY (id);


--
-- TOC entry 3287 (class 2606 OID 88839)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3284 (class 2606 OID 88818)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3292 (class 1259 OID 88946)
-- Name: Departments_depcode_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Departments_depcode_key" ON public."Departments" USING btree (depcode);


--
-- TOC entry 3295 (class 1259 OID 88947)
-- Name: Departments_seccode_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Departments_seccode_key" ON public."Departments" USING btree (seccode);


--
-- TOC entry 3289 (class 1259 OID 88945)
-- Name: Faculties_faccode_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Faculties_faccode_key" ON public."Faculties" USING btree (faccode);


--
-- TOC entry 3285 (class 1259 OID 88943)
-- Name: Users_cid_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Users_cid_key" ON public."Users" USING btree (cid);


--
-- TOC entry 3288 (class 1259 OID 88944)
-- Name: Users_username_key; Type: INDEX; Schema: public; Owner: root
--

CREATE UNIQUE INDEX "Users_username_key" ON public."Users" USING btree (username);


--
-- TOC entry 3321 (class 2606 OID 88983)
-- Name: CourseTransfer CourseTransfer_originalCourseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CourseTransfer"
    ADD CONSTRAINT "CourseTransfer_originalCourseId_fkey" FOREIGN KEY ("originalCourseId") REFERENCES public."StudentCourse"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3322 (class 2606 OID 88993)
-- Name: CourseTransfer CourseTransfer_specialtransferredCourseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CourseTransfer"
    ADD CONSTRAINT "CourseTransfer_specialtransferredCourseId_fkey" FOREIGN KEY ("specialtransferredCourseId") REFERENCES public."SpecialCourse"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3323 (class 2606 OID 88988)
-- Name: CourseTransfer CourseTransfer_transferredCourseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."CourseTransfer"
    ADD CONSTRAINT "CourseTransfer_transferredCourseId_fkey" FOREIGN KEY ("transferredCourseId") REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3320 (class 2606 OID 88978)
-- Name: Course Course_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3314 (class 2606 OID 88948)
-- Name: Departments Departments_faccode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Departments"
    ADD CONSTRAINT "Departments_faccode_fkey" FOREIGN KEY (faccode) REFERENCES public."Faculties"(faccode) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3319 (class 2606 OID 88973)
-- Name: Group Group_subjectCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_subjectCategoryId_fkey" FOREIGN KEY ("subjectCategoryId") REFERENCES public."SubjectCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3324 (class 2606 OID 89010)
-- Name: Notification Notification_StdCourseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_StdCourseId_fkey" FOREIGN KEY ("StdCourseId") REFERENCES public."StudentCourse"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3325 (class 2606 OID 88998)
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(username) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3318 (class 2606 OID 88968)
-- Name: SpecialCourse SpecialCourse_SubSpecialtyGroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SpecialCourse"
    ADD CONSTRAINT "SpecialCourse_SubSpecialtyGroupID_fkey" FOREIGN KEY ("SubSpecialtyGroupID") REFERENCES public."SubSpecialtyGroup"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3316 (class 2606 OID 88958)
-- Name: SpecialGroup SpecialGroup_SubjectCategoryID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SpecialGroup"
    ADD CONSTRAINT "SpecialGroup_SubjectCategoryID_fkey" FOREIGN KEY ("SubjectCategoryID") REFERENCES public."SubjectCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3315 (class 2606 OID 88953)
-- Name: StudentCourse StudentCourse_usernameId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."StudentCourse"
    ADD CONSTRAINT "StudentCourse_usernameId_fkey" FOREIGN KEY ("usernameId") REFERENCES public."Users"(username) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3317 (class 2606 OID 88963)
-- Name: SubSpecialtyGroup SubSpecialtyGroup_SpecialGroupID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."SubSpecialtyGroup"
    ADD CONSTRAINT "SubSpecialtyGroup_SpecialGroupID_fkey" FOREIGN KEY ("SpecialGroupID") REFERENCES public."SpecialGroup"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-10-30 17:43:54

--
-- PostgreSQL database dump complete
--

