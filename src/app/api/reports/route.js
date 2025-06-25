import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req) {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { reportAt: 'desc' },
    });

    const totalReports = await prisma.report.count();

    return NextResponse.json(
      {
        success: true,
        message: "List Data Reports",
        totalReports: totalReports,
        data: reports,
      },
      {
        status: 200,
      }
    );
  }catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch data", 
        error: error.message 
      },
      { 
        status: 500 
      }
  );
  }
}

export async function POST(request) {
  try {
    const { nim, name, phone, title, detail } = await request.json();

    const report = await prisma.report.create({
      data: {
        nim: nim,
        name: name,
        phone: phone,
        title: title,
        detail: detail,
      },
    });

    const totalReports = await prisma.report.count();

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mengirim laporan!",
        totalReports: totalReports,
        data: report,
      },
      {
        status: 201
      }
    )
  } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Gagal mengirim laporan", 
          error: error.message },
        { 
          status: 500 
        }
      );
  }
}