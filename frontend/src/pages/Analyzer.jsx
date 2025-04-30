import React, { useState } from "react";
import { Box, Tabs, Tab, Paper } from "@mui/material";

const Analyzer = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const features = [
    {
      title: "Home Remedies Bot",
      url: "https://rajkhanke-home-remedie-bot.hf.space",
    },
    {
      title: "Medical Report Generator",
      url: "https://rajkhanke-medical-report-prescription-generator.hf.space",
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontSize: "1rem",
              fontWeight: 500,
              textTransform: "none",
              minHeight: "48px",
            },
          }}
        >
          {features.map((feature, index) => (
            <Tab key={index} label={feature.title} />
          ))}
        </Tabs>
      </Paper>

      <Box sx={{ flex: 1, position: "relative" }}>
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: activeTab === index ? "block" : "none",
            }}
          >
            <iframe
              src={feature.url}
              title={feature.title}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "8px",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Analyzer;
