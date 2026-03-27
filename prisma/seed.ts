/* eslint-disable no-console */
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { Pool } from 'pg'

// password: 'ybp_whf3wxn2xdr6MTE'

config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
})

export async function seed() {
  // =====================
  // ADMIN USER
  // =====================
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      publicId: '0197f9cb-e9dd-72f2-8bea-863124fbec4c',
      name: 'Admin User',
      email: 'admin@example.com',
      phoneNumber: '11999999999',
      cpf: '808.996.310-29',
      passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
      role: 'ADMIN',
    },
  })

  // =====================
  // SUPERVISOR DOCTOR USERS
  // =====================
  const supervisorUser1 = await prisma.user.upsert({
    where: { email: 'dr.carlos@example.com' },
    update: {},
    create: {
      name: 'Dr. Carlos Silva',
      email: 'dr.carlos@example.com',
      phoneNumber: '11988887777',
      cpf: '123.456.789-00',
      passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
      role: 'SUPERVISOR_DOCTOR',
    },
  })

  const supervisorUser2 = await prisma.user.upsert({
    where: { email: 'dr.ana@example.com' },
    update: {},
    create: {
      name: 'Dra. Ana Oliveira',
      email: 'dr.ana@example.com',
      phoneNumber: '11977776666',
      cpf: '987.654.321-00',
      passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
      role: 'SUPERVISOR_DOCTOR',
    },
  })

  // =====================
  // SUPERVISOR DOCTORS
  // =====================
  const supervisorDoctor1 = await prisma.supervisorDoctor.upsert({
    where: { userId: supervisorUser1.id },
    update: {},
    create: {
      crm: 'CRM12345',
      crmUf: 'SP',
      status: 'ATIVO',
      userId: supervisorUser1.id,
    },
  })

  const supervisorDoctor2 = await prisma.supervisorDoctor.upsert({
    where: { userId: supervisorUser2.id },
    update: {},
    create: {
      crm: 'CRM67890',
      crmUf: 'RJ',
      status: 'ATIVO',
      userId: supervisorUser2.id,
    },
  })

  // =====================
  // INSTRUCTOR USERS
  // =====================
  const instructorUser1 = await prisma.user.upsert({
    where: { email: 'instrutor.bruno@example.com' },
    update: {},
    create: {
      name: 'Bruno Almeida',
      email: 'instrutor.bruno@example.com',
      phoneNumber: '11966661111',
      cpf: '515.724.170-18',
      passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
      role: 'INSTRUCTOR',
    },
  })

  const instructorUser2 = await prisma.user.upsert({
    where: { email: 'instrutora.larissa@example.com' },
    update: {},
    create: {
      name: 'Larissa Nunes',
      email: 'instrutora.larissa@example.com',
      phoneNumber: '11966662222',
      cpf: '675.306.710-20',
      passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
      role: 'INSTRUCTOR',
    },
  })

  const instructorUser3 = await prisma.user.upsert({
    where: { email: 'instrutor.caio@example.com' },
    update: {},
    create: {
      name: 'Caio Ferreira',
      email: 'instrutor.caio@example.com',
      phoneNumber: '11966663333',
      cpf: '378.815.330-34',
      passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
      role: 'INSTRUCTOR',
    },
  })

  // =====================
  // INSTRUCTORS
  // =====================
  await Promise.all([
    prisma.instructor.upsert({
      where: { userId: instructorUser1.id },
      update: {},
      create: {
        registration: 'INST1001',
        speciality: 'EDUCADOR_FISICO',
        userId: instructorUser1.id,
      },
    }),
    prisma.instructor.upsert({
      where: { userId: instructorUser2.id },
      update: {},
      create: {
        registration: 'INST1002',
        speciality: 'TECNICO_DE_ENFERMAGEM',
        userId: instructorUser2.id,
      },
    }),
    prisma.instructor.upsert({
      where: { userId: instructorUser3.id },
      update: {},
      create: {
        registration: 'INST1003',
        speciality: 'EDUCADOR_FISICO',
        userId: instructorUser3.id,
      },
    }),
  ])

  // =====================
  // PATIENT USERS
  // =====================
  const patientUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'patient1@example.com' },
      update: {},
      create: {
        name: 'João Paciente',
        email: 'patient1@example.com',
        phoneNumber: '11911112222',
        cpf: '111.222.333-44',
        passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
        role: 'PATIENT',
      },
    }),
    prisma.user.upsert({
      where: { email: 'patient2@example.com' },
      update: {},
      create: {
        name: 'Maria Paciente',
        email: 'patient2@example.com',
        phoneNumber: '11922223333',
        cpf: '222.333.444-55',
        passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
        role: 'PATIENT',
      },
    }),
    prisma.user.upsert({
      where: { email: 'patient3@example.com' },
      update: {},
      create: {
        name: 'Pedro Paciente',
        email: 'patient3@example.com',
        phoneNumber: '11933334444',
        cpf: '333.444.555-66',
        passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
        role: 'PATIENT',
      },
    }),
    prisma.user.upsert({
      where: { email: 'patient4@example.com' },
      update: {},
      create: {
        name: 'Lucia Paciente',
        email: 'patient4@example.com',
        phoneNumber: '11944445555',
        cpf: '444.555.666-77',
        passwordHash: '$2a$12$y7AWvv8D1P9AVn2G8XkNZOXyrMZ658QFJyR.2kxM.oP/wmgB/.7.2',
        role: 'PATIENT',
      },
    }),
  ])

  // =====================
  // PATIENTS
  // =====================
  await Promise.all([
    // 2 patients linked to supervisorDoctor1
    prisma.patient.upsert({
      where: { userId: patientUsers[0].id },
      update: {},
      create: {
        birthDate: new Date('1980-05-15'),
        gender: 'MASCULINO',
        riskLevel: 'MODERADO',
        userId: patientUsers[0].id,
        supervisorDoctorId: supervisorDoctor1.id,
        emergencyContactName: 'Esposa João',
        emergencyContactPhone: '11955550001',
      },
    }),
    prisma.patient.upsert({
      where: { userId: patientUsers[1].id },
      update: {},
      create: {
        birthDate: new Date('1975-08-22'),
        gender: 'FEMININO',
        riskLevel: 'ALTO',
        userId: patientUsers[1].id,
        supervisorDoctorId: supervisorDoctor1.id,
        emergencyContactName: 'Marido Maria',
        emergencyContactPhone: '11955550002',
      },
    }),
    // 2 patients linked to supervisorDoctor2
    prisma.patient.upsert({
      where: { userId: patientUsers[2].id },
      update: {},
      create: {
        birthDate: new Date('1990-03-10'),
        gender: 'MASCULINO',
        riskLevel: 'BAIXO',
        userId: patientUsers[2].id,
        supervisorDoctorId: supervisorDoctor2.id,
        emergencyContactName: 'Mae Pedro',
        emergencyContactPhone: '11955550003',
      },
    }),
    prisma.patient.upsert({
      where: { userId: patientUsers[3].id },
      update: {},
      create: {
        birthDate: new Date('1965-11-30'),
        gender: 'FEMININO',
        riskLevel: 'ALTO',
        userId: patientUsers[3].id,
        supervisorDoctorId: supervisorDoctor2.id,
        emergencyContactName: 'Filho Lucia',
        emergencyContactPhone: '11955550004',
      },
    }),
  ])
}

seed()
  .then(() => {
    console.log('Seeding completed successfully.')
    prisma.$disconnect()
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error during seeding:', error)
    prisma.$disconnect()
    process.exit(1)
  })
