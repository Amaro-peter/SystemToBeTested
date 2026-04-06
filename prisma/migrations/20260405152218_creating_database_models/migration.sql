-- CreateEnum
CREATE TYPE "AuthenticationStatus" AS ENUM ('SUCCESS', 'USER_NOT_EXISTS', 'INTERNAL_SERVER_ERROR', 'INCORRECT_PASSWORD', 'RECOVER_PASSWORD', 'INVALID_TOKEN', 'BLOCKED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SUPERVISOR_DOCTOR', 'INSTRUCTOR', 'PATIENT');

-- CreateEnum
CREATE TYPE "UF" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- CreateEnum
CREATE TYPE "DoctorStatus" AS ENUM ('ATIVO', 'SUSPENSO', 'CASSADO', 'INATIVO');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMININO', 'MASCULINO', 'INTERSEXO', 'PREFIRO_NAO_RESPONDER');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('ALTO', 'MODERADO', 'BAIXO');

-- CreateEnum
CREATE TYPE "ProfessionalCategory" AS ENUM ('TECNICO_DE_ENFERMAGEM', 'EDUCADOR_FISICO');

-- CreateEnum
CREATE TYPE "ClinicalSessionStatus" AS ENUM ('AGUARDANDO_ATENDIMENTO', 'REALIZANDO_AVALIACAO_PRE_TREINAMENTO', 'ESTEIRA', 'BICICLETA', 'MUSCULACAO', 'REALIZANDO_AVALIACAO_POS_TREINAMENTO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "BicycleType" AS ENUM ('MMS', 'NORMAL');

-- CreateEnum
CREATE TYPE "TreadmillType" AS ENUM ('CONTINUO', 'INTERVALADO');

-- CreateEnum
CREATE TYPE "StrengthExerciseType" AS ENUM ('STEP', 'MAQUINA', 'BANCO_ALTO');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PATIENT',
    "token" TEXT,
    "token_expires_at" TIMESTAMP(3),
    "password_changed_at" TIMESTAMP(3),
    "login_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_login" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authentication_audit" (
    "id" SERIAL NOT NULL,
    "ip_address" TEXT,
    "remote_port" TEXT,
    "user_agent" TEXT,
    "origin" TEXT,
    "status" "AuthenticationStatus" NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authentication_audit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervisor_doctors" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "crm" VARCHAR(20) NOT NULL,
    "crm_uf" "UF" NOT NULL,
    "status" "DoctorStatus" NOT NULL DEFAULT 'ATIVO',
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_validade" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "supervisor_doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructors" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "speciality" "ProfessionalCategory" NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "medications_in_use" TEXT,
    "assistant_doctor_name" TEXT,
    "assistant_doctor_phone" TEXT,
    "health_insurance_number" TEXT,
    "reference_hospital" TEXT,
    "emergency_contact_name" TEXT,
    "emergency_contact_phone" TEXT,
    "health_insurance" TEXT,
    "gender" "Gender" NOT NULL,
    "risk_level" "RiskLevel" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "supervisorDoctorId" INTEGER,
    "class_id" INTEGER,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "session_id" TEXT NOT NULL,
    "day_of_week" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "visit_id" TEXT NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "check_in" DATE,
    "check_out" DATE,
    "session_start" DATE,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinical_sessions" (
    "id" SERIAL NOT NULL,
    "clinical_session_id" TEXT NOT NULL,
    "status" "ClinicalSessionStatus" NOT NULL,
    "pre_systolic" DOUBLE PRECISION,
    "pre_diastolic" DOUBLE PRECISION,
    "pre_heart_rate" INTEGER,
    "pre_oxygen_saturation" INTEGER,
    "pre_weight" DECIMAL(5,2),
    "pre_glucemia" INTEGER,
    "post_systolic" DOUBLE PRECISION,
    "post_diastolic" DOUBLE PRECISION,
    "post_heart_rate" INTEGER,
    "post_oxygen_saturation" INTEGER,
    "post_weight" DECIMAL(5,2),
    "post_glucemia" INTEGER,
    "visit_id" INTEGER,

    CONSTRAINT "clinical_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" SERIAL NOT NULL,
    "alert_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clinical_session_id" INTEGER NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "log_id" TEXT NOT NULL,
    "activity_before" "ClinicalSessionStatus" NOT NULL,
    "activity_after" "ClinicalSessionStatus" NOT NULL,
    "clinical_session_id" INTEGER NOT NULL,
    "instructor_id" INTEGER NOT NULL,
    "patient_id" INTEGER NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinical_session_versions" (
    "id" SERIAL NOT NULL,
    "version_id" TEXT NOT NULL,
    "content_before" JSONB NOT NULL,
    "table_name" TEXT NOT NULL,
    "element_id" TEXT NOT NULL,
    "updated_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "session_id" INTEGER NOT NULL,
    "adminId" INTEGER,

    CONSTRAINT "clinical_session_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinical_form_metadata" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "element_1" TEXT,
    "element_2" TEXT,
    "element_3" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "clinical_form_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aerobic_training_bicycle_sheets" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "distance" INTEGER,
    "speed" INTEGER,
    "systolic" DOUBLE PRECISION,
    "diastolic" DOUBLE PRECISION,
    "effort_perception" INTEGER,
    "peak_heart_rate" INTEGER,
    "oxygen_saturation" INTEGER,
    "type" "BicycleType" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "clinical_session_id" INTEGER NOT NULL,

    CONSTRAINT "aerobic_training_bicycle_sheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aerobic_training_treadmill_sheets" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "speed" INTEGER,
    "time" INTEGER,
    "distance" DOUBLE PRECISION,
    "repetitions" INTEGER,
    "systolic" DOUBLE PRECISION,
    "diastolic" DOUBLE PRECISION,
    "effort_perception" INTEGER,
    "type" "TreadmillType" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "clinical_session_id" INTEGER NOT NULL,

    CONSTRAINT "aerobic_training_treadmill_sheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strength_training_sheets" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "restrictions" TEXT,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "clinical_session_id" INTEGER NOT NULL,

    CONSTRAINT "strength_training_sheets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strength_exercises" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "observations" TEXT,
    "series" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "load" INTEGER,
    "type" "StrengthExerciseType" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "strength_training_sheet_id" INTEGER NOT NULL,
    "instructor_id" INTEGER,

    CONSTRAINT "strength_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_token_key" ON "users"("token");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_token_idx" ON "users"("token");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "users"("is_active");

-- CreateIndex
CREATE INDEX "authentication_audit_user_id_idx" ON "authentication_audit"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_publicId_key" ON "admins"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_user_id_key" ON "admins"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "supervisor_doctors_publicId_key" ON "supervisor_doctors"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "supervisor_doctors_user_id_key" ON "supervisor_doctors"("user_id");

-- CreateIndex
CREATE INDEX "supervisor_doctors_user_id_idx" ON "supervisor_doctors"("user_id");

-- CreateIndex
CREATE INDEX "supervisor_doctors_status_idx" ON "supervisor_doctors"("status");

-- CreateIndex
CREATE UNIQUE INDEX "supervisor_doctors_crm_crm_uf_key" ON "supervisor_doctors"("crm", "crm_uf");

-- CreateIndex
CREATE UNIQUE INDEX "instructors_publicId_key" ON "instructors"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "instructors_user_id_key" ON "instructors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_publicId_key" ON "patients"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "patients_user_id_key" ON "patients"("user_id");

-- CreateIndex
CREATE INDEX "patients_supervisorDoctorId_idx" ON "patients"("supervisorDoctorId");

-- CreateIndex
CREATE INDEX "patients_risk_level_idx" ON "patients"("risk_level");

-- CreateIndex
CREATE UNIQUE INDEX "classes_session_id_key" ON "classes"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "visits_visit_id_key" ON "visits"("visit_id");

-- CreateIndex
CREATE UNIQUE INDEX "clinical_sessions_clinical_session_id_key" ON "clinical_sessions"("clinical_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "clinical_sessions_visit_id_key" ON "clinical_sessions"("visit_id");

-- CreateIndex
CREATE INDEX "clinical_sessions_status_idx" ON "clinical_sessions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "alerts_alert_id_key" ON "alerts"("alert_id");

-- CreateIndex
CREATE UNIQUE INDEX "logs_log_id_key" ON "logs"("log_id");

-- CreateIndex
CREATE INDEX "logs_clinical_session_id_idx" ON "logs"("clinical_session_id");

-- CreateIndex
CREATE INDEX "logs_instructor_id_idx" ON "logs"("instructor_id");

-- CreateIndex
CREATE UNIQUE INDEX "clinical_session_versions_version_id_key" ON "clinical_session_versions"("version_id");

-- CreateIndex
CREATE INDEX "clinical_session_versions_session_id_idx" ON "clinical_session_versions"("session_id");

-- CreateIndex
CREATE INDEX "clinical_session_versions_user_id_idx" ON "clinical_session_versions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "clinical_form_metadata_public_id_key" ON "clinical_form_metadata"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "clinical_form_metadata_form_id_key" ON "clinical_form_metadata"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "aerobic_training_bicycle_sheets_public_id_key" ON "aerobic_training_bicycle_sheets"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "aerobic_training_bicycle_sheets_clinical_session_id_key" ON "aerobic_training_bicycle_sheets"("clinical_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "aerobic_training_treadmill_sheets_public_id_key" ON "aerobic_training_treadmill_sheets"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "aerobic_training_treadmill_sheets_clinical_session_id_key" ON "aerobic_training_treadmill_sheets"("clinical_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "strength_training_sheets_public_id_key" ON "strength_training_sheets"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "strength_training_sheets_clinical_session_id_key" ON "strength_training_sheets"("clinical_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "strength_exercises_public_id_key" ON "strength_exercises"("public_id");

-- CreateIndex
CREATE INDEX "strength_exercises_strength_training_sheet_id_idx" ON "strength_exercises"("strength_training_sheet_id");

-- AddForeignKey
ALTER TABLE "authentication_audit" ADD CONSTRAINT "authentication_audit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supervisor_doctors" ADD CONSTRAINT "supervisor_doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "instructors" ADD CONSTRAINT "instructors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_supervisorDoctorId_fkey" FOREIGN KEY ("supervisorDoctorId") REFERENCES "supervisor_doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinical_sessions" ADD CONSTRAINT "clinical_sessions_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "visits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_clinical_session_id_fkey" FOREIGN KEY ("clinical_session_id") REFERENCES "clinical_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_clinical_session_id_fkey" FOREIGN KEY ("clinical_session_id") REFERENCES "clinical_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinical_session_versions" ADD CONSTRAINT "clinical_session_versions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clinical_session_versions" ADD CONSTRAINT "clinical_session_versions_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "clinical_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clinical_session_versions" ADD CONSTRAINT "clinical_session_versions_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aerobic_training_bicycle_sheets" ADD CONSTRAINT "aerobic_training_bicycle_sheets_clinical_session_id_fkey" FOREIGN KEY ("clinical_session_id") REFERENCES "clinical_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aerobic_training_treadmill_sheets" ADD CONSTRAINT "aerobic_training_treadmill_sheets_clinical_session_id_fkey" FOREIGN KEY ("clinical_session_id") REFERENCES "clinical_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strength_training_sheets" ADD CONSTRAINT "strength_training_sheets_clinical_session_id_fkey" FOREIGN KEY ("clinical_session_id") REFERENCES "clinical_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strength_exercises" ADD CONSTRAINT "strength_exercises_strength_training_sheet_id_fkey" FOREIGN KEY ("strength_training_sheet_id") REFERENCES "strength_training_sheets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strength_exercises" ADD CONSTRAINT "strength_exercises_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
