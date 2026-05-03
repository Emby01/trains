import re
import os
# Required files: stations.txt, toconvert.txt
# Creates converted.txt
print(os.getcwd())
with open("tools/stations.txt", "r", encoding="utf-8") as file:
    stations = [line.strip() for line in file if line.strip()]
print("Successfully read stations")

# Create the re pattern which creates stuff like "Central"
repattern = r"(" + "|".join(re.escape(station) for station in stations) + r")\d+"
print("Successfully created repattern")


with open("tools/toconvert.txt", "r", encoding="utf-8") as file:
    svg = file.read()
print("Successfully read toconvert")


id_regex = rf'\s*id="{repattern}"' # Remove leading spaces
svg = re.sub(id_regex, "", svg) # Replace the id="thing1" with NOTHING
print("Successfully converted repattern")

serif_regex = rf'serif:id="' # Replace serif:id with class
svg = re.sub(serif_regex, r'class="', svg)
print("Successfully converted serif:id's")

id_regex = rf'id="' # Replace id with class
svg = re.sub(id_regex, r'class="', svg)
print("Successfully converted id's")

id_regex = rf'class="Layer-1"' # Replace this random id thing
svg = re.sub(id_regex, r'class="Layer-1"', svg)
print("Cleanup complete")

with open("tools/converted.txt", "w", encoding="utf-8") as file:
    file.write(svg)
print("Convert complete")