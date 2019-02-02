require "json"

class NightShiftManager
  def initialize(filePath)
    file = File.read filePath

    @data = JSON.parse(file)
  end

  def getWorkerShifts(id)
    return @data['shifts'].find_all { |shift| shift['user_id'] == id }
  end

  def writeJSON(data, filePath)
    File.open(filePath,'w') do |f|
      f.write(JSON.pretty_generate(data))
    end
  end

  def workersPrices(outputFile)
    output = {
      workers: []
    }

    @data['workers'].each do |worker|
      workerShifts = getWorkerShifts(worker['id'])
      workerPrice = worker['price_per_shift'] * workerShifts.length

      output[:workers].push({ id: worker['id'], price: workerPrice })
    end

    writeJSON(output, outputFile)

    puts 'Done.'
  end

  private :getWorkerShifts, :writeJSON
end

ns = NightShiftManager.new('./data.json')

ns.workersPrices('output.json')

