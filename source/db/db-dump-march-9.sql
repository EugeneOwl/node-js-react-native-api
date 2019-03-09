--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Ubuntu 11.2-1.pgdg16.04+1)
-- Dumped by pg_dump version 11.2 (Ubuntu 11.2-1.pgdg16.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dcou7no15tmk79; Type: DATABASE; Schema: -; Owner: knwmxaghbwqfzr
--

CREATE DATABASE dcou7no15tmk79 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE dcou7no15tmk79 OWNER TO knwmxaghbwqfzr;

\connect dcou7no15tmk79

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.permissions (
    id integer NOT NULL,
    name character varying(55) NOT NULL
);


ALTER TABLE public.permissions OWNER TO knwmxaghbwqfzr;

--
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE SEQUENCE public.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permissions_id_seq OWNER TO knwmxaghbwqfzr;

--
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying(55) NOT NULL
);


ALTER TABLE public.projects OWNER TO knwmxaghbwqfzr;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO knwmxaghbwqfzr;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: role_permission_relation; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.role_permission_relation (
    role_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.role_permission_relation OWNER TO knwmxaghbwqfzr;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(55) NOT NULL,
    description text
);


ALTER TABLE public.roles OWNER TO knwmxaghbwqfzr;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO knwmxaghbwqfzr;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: task_logs; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.task_logs (
    id integer NOT NULL,
    comment text,
    user_id integer NOT NULL,
    task_id integer NOT NULL,
    date_created date DEFAULT now() NOT NULL,
    time_created time without time zone DEFAULT (now() + '03:00:00'::interval) NOT NULL,
    time_logged time without time zone NOT NULL
);


ALTER TABLE public.task_logs OWNER TO knwmxaghbwqfzr;

--
-- Name: task_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE SEQUENCE public.task_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_logs_id_seq OWNER TO knwmxaghbwqfzr;

--
-- Name: task_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER SEQUENCE public.task_logs_id_seq OWNED BY public.task_logs.id;


--
-- Name: task_status_timelines; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.task_status_timelines (
    id integer NOT NULL,
    user_id integer NOT NULL,
    task_id integer NOT NULL,
    task_status_id integer NOT NULL,
    date_created date DEFAULT now() NOT NULL,
    time_created time without time zone DEFAULT (now() + '03:00:00'::interval) NOT NULL
);


ALTER TABLE public.task_status_timelines OWNER TO knwmxaghbwqfzr;

--
-- Name: task_status_timelines_id_seq; Type: SEQUENCE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE SEQUENCE public.task_status_timelines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_status_timelines_id_seq OWNER TO knwmxaghbwqfzr;

--
-- Name: task_status_timelines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER SEQUENCE public.task_status_timelines_id_seq OWNED BY public.task_status_timelines.id;


--
-- Name: task_statuses; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.task_statuses (
    id integer NOT NULL,
    name character varying(55) NOT NULL
);


ALTER TABLE public.task_statuses OWNER TO knwmxaghbwqfzr;

--
-- Name: task_statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE SEQUENCE public.task_statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_statuses_id_seq OWNER TO knwmxaghbwqfzr;

--
-- Name: task_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER SEQUENCE public.task_statuses_id_seq OWNED BY public.task_statuses.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    name character varying(55) NOT NULL,
    description text,
    date_created date DEFAULT now() NOT NULL,
    time_created time without time zone DEFAULT (now() + '03:00:00'::interval) NOT NULL,
    task_status_id integer NOT NULL,
    deadline_date date,
    parent_id integer,
    created_by integer NOT NULL,
    assigned_by integer,
    assigned_to integer,
    project_id integer NOT NULL
);


ALTER TABLE public.tasks OWNER TO knwmxaghbwqfzr;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO knwmxaghbwqfzr;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: team_user_relation; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.team_user_relation (
    user_id integer NOT NULL,
    team_id integer NOT NULL
);


ALTER TABLE public.team_user_relation OWNER TO knwmxaghbwqfzr;

--
-- Name: teams; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.teams (
    id integer NOT NULL,
    name character varying(55) NOT NULL,
    project_id integer NOT NULL,
    leader_id integer NOT NULL
);


ALTER TABLE public.teams OWNER TO knwmxaghbwqfzr;

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE SEQUENCE public.teams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_id_seq OWNER TO knwmxaghbwqfzr;

--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(55) NOT NULL,
    role_id integer,
    password character varying(100) NOT NULL,
    avatar character varying(100),
    deleted boolean DEFAULT false NOT NULL,
    project_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO knwmxaghbwqfzr;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO knwmxaghbwqfzr;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: task_logs id; Type: DEFAULT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_logs ALTER COLUMN id SET DEFAULT nextval('public.task_logs_id_seq'::regclass);


--
-- Name: task_status_timelines id; Type: DEFAULT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_status_timelines ALTER COLUMN id SET DEFAULT nextval('public.task_status_timelines_id_seq'::regclass);


--
-- Name: task_statuses id; Type: DEFAULT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_statuses ALTER COLUMN id SET DEFAULT nextval('public.task_statuses_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.permissions (id, name) FROM stdin;
1	MANAGE_PERMISSIONS
10	CREATE_TASKS
11	EDIT_TASKS
12	DELETE_TASKS
15	CREATE_USERS
16	CREATE_TEAMS
13	EXECUTE_TASKS
14	CHECK_UP_TASK_EXECUTION
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.projects (id, name) FROM stdin;
10	project 1
11	project 2
\.


--
-- Data for Name: role_permission_relation; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.role_permission_relation (role_id, permission_id) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.roles (id, name, description) FROM stdin;
1	Root Manager	Can execute every available action in the System
\.


--
-- Data for Name: task_logs; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.task_logs (id, comment, user_id, task_id, date_created, time_created, time_logged) FROM stdin;
10	Worked hard.	10	10	2019-03-09	15:31:01.620068	00:03:20
11	Worked easy.	10	10	2019-03-09	18:32:13.808321	00:00:10
\.


--
-- Data for Name: task_status_timelines; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.task_status_timelines (id, user_id, task_id, task_status_id, date_created, time_created) FROM stdin;
\.


--
-- Data for Name: task_statuses; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.task_statuses (id, name) FROM stdin;
1	TO PERFORM
2	IN PROGRESS
3	READY FOR VERIFICATION
4	VERIFICATION APPROVED
5	DONE
6	FROZEN
7	DENIED
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.tasks (id, name, description, date_created, time_created, task_status_id, deadline_date, parent_id, created_by, assigned_by, assigned_to, project_id) FROM stdin;
10	task 1	task 1 description	2019-03-09	15:26:45.837885	1	2019-03-10	\N	10	10	10	10
11	task 2	task 2 description	2019-03-09	18:34:29.020046	1	2019-03-12	10	10	10	10	10
\.


--
-- Data for Name: team_user_relation; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.team_user_relation (user_id, team_id) FROM stdin;
10	10
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.teams (id, name, project_id, leader_id) FROM stdin;
10	team 1	10	10
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: knwmxaghbwqfzr
--

COPY public.users (id, username, role_id, password, avatar, deleted, project_id) FROM stdin;
10	eugene	1	pwd	\N	f	10
\.


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: knwmxaghbwqfzr
--

SELECT pg_catalog.setval('public.permissions_id_seq', 1, false);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: knwmxaghbwqfzr
--

SELECT pg_catalog.setval('public.projects_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: knwmxaghbwqfzr
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: task_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: knwmxaghbwqfzr
--

SELECT pg_catalog.setval('public.task_logs_id_seq', 1, false);


--
-- Name: task_status_timelines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: knwmxaghbwqfzr
--

SELECT pg_catalog.setval('public.task_status_timelines_id_seq', 1, false);


--
-- Name: task_statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: knwmxaghbwqfzr
--

SELECT pg_catalog.setval('public.task_statuses_id_seq', 1, false);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: knwmxaghbwqfzr
--

SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: knwmxaghbwqfzr
--

SELECT pg_catalog.setval('public.teams_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: knwmxaghbwqfzr
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: permissions permissions_pk; Type: CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pk PRIMARY KEY (id);


--
-- Name: projects projects_pk; Type: CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pk PRIMARY KEY (id);


--
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (id);


--
-- Name: task_logs task_logs_pk; Type: CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_logs
    ADD CONSTRAINT task_logs_pk PRIMARY KEY (id);


--
-- Name: task_status_timelines task_status_timelines_pk; Type: CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_status_timelines
    ADD CONSTRAINT task_status_timelines_pk PRIMARY KEY (id);


--
-- Name: task_statuses task_statuses_pk; Type: CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_statuses
    ADD CONSTRAINT task_statuses_pk PRIMARY KEY (id);


--
-- Name: tasks tasks_pk; Type: CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pk PRIMARY KEY (id);


--
-- Name: teams teams_pk; Type: CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: permissions_name_uindex; Type: INDEX; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE UNIQUE INDEX permissions_name_uindex ON public.permissions USING btree (name);


--
-- Name: permissions_name_uindex_2; Type: INDEX; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE UNIQUE INDEX permissions_name_uindex_2 ON public.permissions USING btree (name);


--
-- Name: role_permission_relation_role_id_permission_id_uindex; Type: INDEX; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE UNIQUE INDEX role_permission_relation_role_id_permission_id_uindex ON public.role_permission_relation USING btree (role_id, permission_id);


--
-- Name: task_statuses_name_uindex; Type: INDEX; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE UNIQUE INDEX task_statuses_name_uindex ON public.task_statuses USING btree (name);


--
-- Name: teams_name_uindex; Type: INDEX; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE UNIQUE INDEX teams_name_uindex ON public.teams USING btree (name);


--
-- Name: user_team_relation_user_id_team_id_uindex; Type: INDEX; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE UNIQUE INDEX user_team_relation_user_id_team_id_uindex ON public.team_user_relation USING btree (user_id, team_id);


--
-- Name: users_username_uindex; Type: INDEX; Schema: public; Owner: knwmxaghbwqfzr
--

CREATE UNIQUE INDEX users_username_uindex ON public.users USING btree (username);


--
-- Name: role_permission_relation role_permission_relation_permissions_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.role_permission_relation
    ADD CONSTRAINT role_permission_relation_permissions_id_fk FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: role_permission_relation role_permission_relation_roles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.role_permission_relation
    ADD CONSTRAINT role_permission_relation_roles_id_fk FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: task_logs task_logs_tasks_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_logs
    ADD CONSTRAINT task_logs_tasks_id_fk FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: task_logs task_logs_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_logs
    ADD CONSTRAINT task_logs_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: task_status_timelines task_status_timelines_task_statuses_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_status_timelines
    ADD CONSTRAINT task_status_timelines_task_statuses_id_fk FOREIGN KEY (task_status_id) REFERENCES public.task_statuses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: task_status_timelines task_status_timelines_tasks_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_status_timelines
    ADD CONSTRAINT task_status_timelines_tasks_id_fk FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: task_status_timelines task_status_timelines_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.task_status_timelines
    ADD CONSTRAINT task_status_timelines_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tasks tasks_projects_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_projects_id_fk FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tasks tasks_task_statuses_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_task_statuses_id_fk FOREIGN KEY (task_status_id) REFERENCES public.task_statuses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tasks tasks_tasks_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_tasks_id_fk FOREIGN KEY (parent_id) REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tasks tasks_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_users_id_fk FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tasks tasks_users_id_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_users_id_fk_2 FOREIGN KEY (assigned_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: tasks tasks_users_id_fk_3; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_users_id_fk_3 FOREIGN KEY (assigned_to) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: teams teams_projects_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_projects_id_fk FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: teams teams_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_users_id_fk FOREIGN KEY (leader_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: team_user_relation user_team_relation_teams_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.team_user_relation
    ADD CONSTRAINT user_team_relation_teams_id_fk FOREIGN KEY (team_id) REFERENCES public.teams(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: team_user_relation user_team_relation_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.team_user_relation
    ADD CONSTRAINT user_team_relation_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_projects_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_projects_id_fk FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: users users_roles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: knwmxaghbwqfzr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roles_id_fk FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: DATABASE dcou7no15tmk79; Type: ACL; Schema: -; Owner: knwmxaghbwqfzr
--

REVOKE CONNECT,TEMPORARY ON DATABASE dcou7no15tmk79 FROM PUBLIC;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: knwmxaghbwqfzr
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO knwmxaghbwqfzr;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO knwmxaghbwqfzr;


--
-- PostgreSQL database dump complete
--

