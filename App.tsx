"""
export_data.py — Re-export Logbuch_data.xlsx → src/data/akh_data.json

Usage:
    python scripts/export_data.py --input path/to/Logbuch_data.xlsx

Requirements:
    pip install pandas openpyxl
"""

import argparse
import json
from pathlib import Path

import pandas as pd


def export(input_path: str, output_path: str) -> None:
    df = pd.read_excel(input_path)
    df.columns = df.columns.str.strip()

    buildings = (
        df.groupby("Gebäude")
        .agg(rooms=("Raumnummer", "count"), area=("AKH m²", "sum"))
        .reset_index()
    )
    buildings.columns = ["gebaeude", "rooms", "area"]
    buildings["area"] = buildings["area"].round(2)

    depts = (
        df.groupby("Fachbereich")
        .agg(rooms=("Raumnummer", "count"), area=("AKH m²", "sum"))
        .reset_index()
    )
    depts.columns = ["name", "rooms", "area"]
    depts["area"] = depts["area"].round(2)
    depts = depts.sort_values("area", ascending=False).head(20)

    kst_data = (
        df.dropna(subset=["KST", "KST-Bez."])
        .groupby(["KST", "KST-Bez."])
        .agg(rooms=("Raumnummer", "count"), area=("AKH m²", "sum"))
        .reset_index()
    )
    kst_data.columns = ["kst", "kst_bez", "rooms", "area"]
    kst_data["area"] = kst_data["area"].round(2)
    kst_data = kst_data.sort_values("area", ascending=False).head(30)

    kat = (
        df.groupby("Kategorie")
        .agg(rooms=("Raumnummer", "count"), area=("AKH m²", "sum"))
        .reset_index()
    )
    kat.columns = ["name", "rooms", "area"]
    kat = kat.dropna(subset=["name"])
    kat["area"] = kat["area"].round(2)

    raumart = (
        df.groupby("Raumart")
        .agg(rooms=("Raumnummer", "count"))
        .reset_index()
    )
    raumart.columns = ["name", "rooms"]
    raumart = raumart.dropna(subset=["name"]).sort_values("rooms", ascending=False).head(15)

    floors = (
        df.groupby(["Gebäude", "Etage"])
        .agg(rooms=("Raumnummer", "count"), area=("AKH m²", "sum"))
        .reset_index()
    )
    floors.columns = ["gebaeude", "etage", "rooms", "area"]
    floors["area"] = floors["area"].round(2)

    boden = df["Fußbodenbelag"].dropna().value_counts().reset_index()
    boden.columns = ["name", "count"]
    boden = boden.head(10)

    rooms_sample = df[
        ["Raumnummer", "Raumbezeichnung", "Gebäude", "Etage", "Fachbereich",
         "AKH m²", "Kategorie", "Raumart", "KST", "KST-Bez.", "Gesellschaft"]
    ].dropna(subset=["Raumnummer"]).head(200)
    rooms_sample.columns = [
        "raumnummer", "raumbezeichnung", "gebaeude", "etage",
        "fachbereich", "area", "kategorie", "raumart", "kst", "kst_bez", "gesellschaft",
    ]
    rooms_sample["area"] = rooms_sample["area"].fillna(0).round(2)
    rooms_sample["etage"] = rooms_sample["etage"].astype(int)

    out = {
        "meta": {
            "totalRooms":     int(len(df)),
            "totalArea":      round(float(df["AKH m²"].sum()), 2),
            "totalBuildings": int(df["Gebäude"].nunique()),
            "totalFloors":    9,
            "totalDepts":     int(df["Fachbereich"].nunique()),
            "totalKST":       int(df["KST"].nunique()),
        },
        "buildings": buildings.to_dict("records"),
        "depts":     depts.to_dict("records"),
        "kst":       kst_data.to_dict("records"),
        "kategorien": kat.to_dict("records"),
        "raumarten": raumart.to_dict("records"),
        "floors":    floors.to_dict("records"),
        "boden":     boden.to_dict("records"),
        "rooms":     rooms_sample.fillna("").to_dict("records"),
    }

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"✅ Exported {len(out['rooms'])} rooms to {output_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input",  default="Logbuch_data.xlsx")
    parser.add_argument("--output", default="src/data/akh_data.json")
    args = parser.parse_args()
    export(args.input, args.output)
