import { Box, TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export const SearchBar = ({ value, onChange, placeholder, label }: SearchBarProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label={label || "Buscar"}
        placeholder={placeholder || "Nombre del Pokémon..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          transition: "background-color 0.3s ease",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.2)",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};