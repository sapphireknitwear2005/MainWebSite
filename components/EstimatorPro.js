"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  garmentStyles,
  fabrics,
  colors,
  printing,
  embroidery,
  trims,
  compliance,
  urgency,
} from "../data/estimatorData";
import { calculateEstimate } from "../data/estimatorLogic";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function EstimatorPro() {
  const [inputs, setInputs] = useState({
    garment: garmentStyles[0],
    fabric: fabrics[0],
    color: colors[0],
    print: printing[0],
    embroidery: embroidery[0],
    trim: trims[0],
    compliance: compliance[0],
    urgency: urgency[0],
    qty: 500,
  });

  const [result, setResult] = useState(null);

  const handleSelectChange = (value, options, key) => {
    const selected = options.find((o) => o.value === value);
    setInputs({ ...inputs, [key]: selected });
  };

  const handleQtyChange = (e) => {
    setInputs({ ...inputs, qty: Number(e.target.value) });
  };

  const calculate = () => {
    setResult(calculateEstimate(inputs));
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="p-6 shadow-xl border rounded-2xl bg-gradient-to-br from-white to-gray-50">
        <h2 className="text-2xl font-semibold mb-6">⚡ Configure Your Order</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Garment */}
          <Select
            onValueChange={(v) =>
              handleSelectChange(v, garmentStyles, "garment")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Garment Style" />
            </SelectTrigger>
            <SelectContent>
              {garmentStyles.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Fabric */}
          <Select
            onValueChange={(v) => handleSelectChange(v, fabrics, "fabric")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Fabric" />
            </SelectTrigger>
            <SelectContent>
              {fabrics.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Color */}
          <Select onValueChange={(v) => handleSelectChange(v, colors, "color")}>
            <SelectTrigger>
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Printing */}
          <Select
            onValueChange={(v) => handleSelectChange(v, printing, "print")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Printing" />
            </SelectTrigger>
            <SelectContent>
              {printing.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Embroidery */}
          <Select
            onValueChange={(v) =>
              handleSelectChange(v, embroidery, "embroidery")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Embroidery" />
            </SelectTrigger>
            <SelectContent>
              {embroidery.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Trims */}
          <Select onValueChange={(v) => handleSelectChange(v, trims, "trim")}>
            <SelectTrigger>
              <SelectValue placeholder="Trims" />
            </SelectTrigger>
            <SelectContent>
              {trims.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Compliance */}
          <Select
            onValueChange={(v) =>
              handleSelectChange(v, compliance, "compliance")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Compliance" />
            </SelectTrigger>
            <SelectContent>
              {compliance.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Urgency */}
          <Select
            onValueChange={(v) => handleSelectChange(v, urgency, "urgency")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              {urgency.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Quantity */}
          <Input
            type="number"
            value={inputs.qty}
            onChange={handleQtyChange}
            placeholder="Order Quantity"
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            onClick={calculate}
            className="px-6 py-2 text-lg shadow-lg rounded-xl"
          >
            🚀 Estimate Now
          </Button>
        </div>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="p-6 border shadow-lg rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-100">
            <h3 className="text-xl font-semibold mb-4">📊 Your Estimate</h3>
            {result.error ? (
              <p className="text-red-600">{result.error}</p>
            ) : (
              <CardContent className="space-y-2 text-gray-800">
                <p>
                  <strong>MOQ:</strong> {result.moq} pcs
                </p>
                <p>
                  <strong>Lead Time:</strong> {result.lead} days
                </p>
                <p>
                  <strong>Cost per Unit:</strong> ${result.cost}
                </p>
                <p>
                  <strong>Total Cost:</strong> ${result.totalCost}
                </p>
              </CardContent>
            )}
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
